import { findStoreById } from "../../stores/repositories/store.repository.js";
import { findUserById } from "../../users/repositories/user.repository.js";
import {
  createMission,
  findMissionById,
  findUserMission,
  createUserMission,
  findUserMissionById,
} from "../repositories/mission.repository.js";
import {
  CreateMissionRequestDTO,
  MissionResponseDTO,
  ChallengeMissionRequestDTO,
  ChallengeMissionResponseDTO,
} from "../dtos/mission.dto.js";

// ====== 미션 추가 (기존) ======
export const addMissionToStore = async (
  storeId: number,
  data: CreateMissionRequestDTO
): Promise<MissionResponseDTO> => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  if (data.reward < 0) {
    throw new Error("리워드는 0 이상이어야 합니다.");
  }

  const missionId = await createMission(
    storeId,
    data.content,
    data.reward,
    data.deadline ?? null
  );

  const mission = await findMissionById(missionId);
  if (!mission) {
    throw new Error("미션 생성 후 조회에 실패했습니다.");
  }

  return {
    missionId: mission.id,
    storeId: mission.store_id,
    content: mission.content,
    reward: mission.reward,
    deadline: mission.deadline ? mission.deadline.toISOString() : null,
  };
};

// ====== 미션 도전 (신규) ======
export const challengeMissionByUser = async (
  userId: number,
  data: ChallengeMissionRequestDTO
): Promise<ChallengeMissionResponseDTO> => {
  // 1. 유저 존재 검증
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("존재하지 않는 유저입니다.");
  }

  // 2. 미션 존재 검증
  const mission = await findMissionById(data.missionId);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  // 3. 중복 도전 검증 (필수!)
  const existing = await findUserMission(userId, data.missionId);
  if (existing) {
    throw new Error("이미 도전 중이거나 완료한 미션입니다.");
  }

  // 4. 도전 추가
  const userMissionId = await createUserMission(userId, data.missionId);

  // 5. 응답 변환
  const userMission = await findUserMissionById(userMissionId);
  if (!userMission) {
    throw new Error("미션 도전 후 조회에 실패했습니다.");
  }

  return {
    userMissionId: userMission.id,
    userId: userMission.user_id,
    missionId: userMission.mission_id,
    status: userMission.status,
  };
};