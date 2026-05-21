import { Router } from "express";
import { handleCreateReview, handleGetMyReviews } from "./controllers/review.controller.js";

const reviewRouter = Router();

// POST /api/v1/stores/:storeId/reviews
reviewRouter.post("/stores/:storeId/reviews", handleCreateReview);
reviewRouter.get("/users/:userId/reviews", handleGetMyReviews);

export default reviewRouter;