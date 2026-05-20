export interface CreateReviewRequestDTO {
  userId: number;
  score: number;
  content: string;
}

export interface ReviewResponseDTO {
  reviewId: number;
  storeId: number;
  userId: number;
  score: number;
  content: string;
}