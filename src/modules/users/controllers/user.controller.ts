import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signupUser } from "../services/user.service.js";

export const handleUserSignup = async (req: Request, res: Response) => {
  try {
    const result = await signupUser(req.body);
    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: StatusCodes.CREATED,
      message: "회원가입 성공",
      result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      code: StatusCodes.BAD_REQUEST,
      message: error.message ?? "회원가입 실패",
    });
  }
};