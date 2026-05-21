import { findStoreById } from "../../stores/repositories/store.repository.js";
import { findUserById } from "../../users/repositories/user.repository.js";
import { createReview, findReviewById, findReviewsByUserId } from "../repositories/review.repository.js";
import { CreateReviewRequestDTO, ReviewResponseDTO } from "../dtos/review.dto.js";

export const addReviewToStore = async (
  storeId: number,
  data: CreateReviewRequestDTO
): Promise<ReviewResponseDTO> => {
  // 1. 가게 존재 검증 (필수)
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 2. 유저 존재 검증
  const user = await findUserById(data.userId);
  if (!user) {
    throw new Error("존재하지 않는 유저입니다.");
  }

  // 3. 점수 범위 검증 (0 ~ 5)
  if (data.score < 0 || data.score > 5) {
    throw new Error("점수는 0과 5 사이여야 합니다.");
  }

  // 4. 리뷰 생성
  const reviewId = await createReview(
    storeId,
    data.userId,
    data.score,
    data.content
  );

  // 5. 생성된 리뷰 조회 후 응답 변환
  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error("리뷰 생성 후 조회에 실패했습니다.");
  }

  return {
  reviewId: Number(review.id),
  storeId: Number(review.store_id),
  userId: Number(review.user_id),
  score: Number(review.score),
  content: review.content ?? "",
  };
};

export const getReviewsByUser = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
  const reviews = await findReviewsByUserId(userId);
  return reviews.map((r) => ({
    reviewId: Number(r.id),
    storeId: Number(r.store_id),
    storeName: r.stores.name,
    score: Number(r.score),
    content: r.content ?? "",
  }));
};