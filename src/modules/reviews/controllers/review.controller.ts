import { Body, Controller, Get, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { addReviewToStore, getReviewsByUser } from "../services/review.service.js";
import { CreateReviewRequestDTO } from "../dtos/review.dto.js";
import { ErrorResponse } from "../../../common/error.dto.js";

@Route("api/v1")
@Tags("Review")
export class ReviewController extends Controller {
  /**
   * 가게에 리뷰 작성 API
   * 가게/유저 존재 여부와 점수(0~5) 범위가 검증됩니다.
   */
  @Post("stores/{storeId}/reviews")
  @SuccessResponse(201, "리뷰 작성 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 가게/유저 또는 점수 범위 오류", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 가게입니다.",
  })
  public async createReview(
    @Path() storeId: number,
    @Body() body: CreateReviewRequestDTO
  ): Promise<any> {
    this.setStatus(201);
    const result = await addReviewToStore(storeId, body);
    return { isSuccess: true, code: 201, message: "리뷰 작성 성공", result };
  }

  /**
   * 내가 작성한 리뷰 목록 조회 API
   */
  @Get("users/{userId}/reviews")
  @SuccessResponse(200, "리뷰 목록 조회 성공")
  @Response<ErrorResponse>(400, "존재하지 않는 유저", {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 유저입니다.",
  })
  public async getMyReviews(@Path() userId: number): Promise<any> {
    const result = await getReviewsByUser(userId);
    return { isSuccess: true, code: 200, message: "리뷰 목록 조회 성공", result };
  }
}