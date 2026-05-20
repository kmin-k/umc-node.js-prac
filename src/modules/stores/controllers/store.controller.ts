import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createStoreInRegion } from "../services/store.service.js";

export const handleCreateStore = async (req: Request, res: Response) => {
  try {
    const regionId = Number(req.params.regionId);
    if (isNaN(regionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
        code: StatusCodes.BAD_REQUEST,
        message: "regionId는 숫자여야 합니다.",
      });
    }

    const result = await createStoreInRegion(regionId, req.body);
    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: StatusCodes.CREATED,
      message: "가게 추가 성공",
      result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      code: StatusCodes.BAD_REQUEST,
      message: error.message ?? "가게 추가 실패",
    });
  }
};