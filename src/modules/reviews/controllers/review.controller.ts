import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addReviewToStore, getReviewsByUser } from "../services/review.service.js";

export const handleCreateReview = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);
    if (isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        isSuccess: false,
        code: StatusCodes.BAD_REQUEST,
        message: "storeId는 숫자여야 합니다.",
      });
    }

    const result = await addReviewToStore(storeId, req.body);
    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: StatusCodes.CREATED,
      message: "리뷰 작성 성공",
      result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      code: StatusCodes.BAD_REQUEST,
      message: error.message ?? "리뷰 작성 실패",
    });
  }
};

export const handleGetMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ isSuccess: false, code: 400, message: "userId 숫자 아님" });
    const result = await getReviewsByUser(userId);
    return res.status(200).json({ isSuccess: true, code: 200, message: "리뷰 목록 조회 성공", result });
  } catch (error: any) {
    return res.status(400).json({ isSuccess: false, code: 400, message: error.message });
  }
};