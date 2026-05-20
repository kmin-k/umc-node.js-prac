import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addMissionToStore,
  challengeMissionByUser,
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