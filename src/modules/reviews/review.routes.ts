import { Router } from "express";
import { handleCreateReview } from "./controllers/review.controller.js";

const reviewRouter = Router();

// POST /api/v1/stores/:storeId/reviews
reviewRouter.post("/stores/:storeId/reviews", handleCreateReview);

export default reviewRouter;