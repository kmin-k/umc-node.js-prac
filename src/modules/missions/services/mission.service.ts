import { findStoreById } from "../../stores/repositories/store.repository.js";
import { findUserById } from "../../users/repositories/user.repository.js";
import {
  createMission,
  findMissionById,
  findUserMission,
  createUserMission,
  findUserMissionById,
  findMissionsByStoreId,
  findUserMissionsByStatus,
  updateUserMissionToComplete,
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
  missionId: Number(mission.id),
  storeId: Number(mission.store_id),
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
  userMissionId: Number(userMission.id),
  userId: Number(userMission.user_id),
  missionId: Number(userMission.mission_id),
  status: userMission.status,
};
};

// 가게 미션 목록
export const getMissionsByStore = async (storeId: number) => {
  const store = await findStoreById(storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");
  const missions = await findMissionsByStoreId(storeId);
  return missions.map((m) => ({
    missionId: Number(m.id),
    content: m.content,
    reward: m.reward,
    deadline: m.deadline?.toISOString() ?? null,
  }));
};

// 내 미션 목록 (status 별)
export const getUserMissionsByStatus = async (
  userId: number,
  status: "ongoing" | "complete"
) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
  const list = await findUserMissionsByStatus(userId, status);
  return list.map((um) => ({
    userMissionId: Number(um.id),
    missionId: Number(um.mission_id),
    storeName: um.missions.stores.name,
    content: um.missions.content,
    reward: um.missions.reward,
    status: um.status,
  }));
};

// 미션 완료 처리
export const completeMission = async (userId: number, missionId: number) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
  const userMission = await findUserMission(userId, missionId);
  if (!userMission) throw new Error("도전 중인 미션이 아닙니다.");
  if (userMission.status === "complete") throw new Error("이미 완료된 미션입니다.");
  const updated = await updateUserMissionToComplete(Number(userMission.id));
  return {
    userMissionId: Number(updated.id),
    userId: Number(updated.user_id),
    missionId: Number(updated.mission_id),
    status: updated.status,
  };
};