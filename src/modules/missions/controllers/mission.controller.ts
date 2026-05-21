import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addMissionToStore,
  challengeMissionByUser,
  getMissionsByStore,
  getUserMissionsByStatus,
  completeMission,
} from "../services/mission.service.js";

// 미션 추가 (기존)
export const handleCreateMission = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);
    if (isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
        code: StatusCodes.BAD_REQUEST,
        message: "storeId는 숫자여야 합니다.",
      });
    }

    const result = await addMissionToStore(storeId, req.body);
    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: StatusCodes.CREATED,
      message: "미션 추가 성공",
      result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      code: StatusCodes.BAD_REQUEST,
      message: error.message ?? "미션 추가 실패",
    });
  }
};

// 미션 도전 (신규)
export const handleChallengeMission = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
        code: StatusCodes.BAD_REQUEST,
        message: "userId는 숫자여야 합니다.",
      });
    }

    const result = await challengeMissionByUser(userId, req.body);
    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: StatusCodes.CREATED,
      message: "미션 도전 성공",
      result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      code: StatusCodes.BAD_REQUEST,
      message: error.message ?? "미션 도전 실패",
    });
  }
};

export const handleGetStoreMissions = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);
    if (isNaN(storeId)) return res.status(400).json({ isSuccess: false, code: 400, message: "storeId 숫자 아님" });
    const result = await getMissionsByStore(storeId);
    return res.status(200).json({ isSuccess: true, code: 200, message: "가게 미션 목록 조회 성공", result });
  } catch (error: any) {
    return res.status(400).json({ isSuccess: false, code: 400, message: error.message });
  }
};

export const handleGetMyMissions = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ isSuccess: false, code: 400, message: "userId 숫자 아님" });
    const status = (req.query.status as string) || "ongoing";
    if (status !== "ongoing" && status !== "complete") {
      return res.status(400).json({ isSuccess: false, code: 400, message: "status는 ongoing 또는 complete" });
    }
    const result = await getUserMissionsByStatus(userId, status);
    return res.status(200).json({ isSuccess: true, code: 200, message: "내 미션 목록 조회 성공", result });
  } catch (error: any) {
    return res.status(400).json({ isSuccess: false, code: 400, message: error.message });
  }
};

export const handleCompleteMission = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const missionId = Number(req.params.missionId);
    if (isNaN(userId) || isNaN(missionId))
      return res.status(400).json({ isSuccess: false, code: 400, message: "ID는 숫자여야 함" });
    const result = await completeMission(userId, missionId);
    return res.status(200).json({ isSuccess: true, code: 200, message: "미션 완료 처리 성공", result });
  } catch (error: any) {
    return res.status(400).json({ isSuccess: false, code: 400, message: error.message });
  }
};