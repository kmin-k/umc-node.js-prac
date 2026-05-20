import { Router } from "express";
import { handleCreateStore } from "./controllers/store.controller.js";

const storeRouter = Router();

// POST /api/v1/regions/:regionId/stores
storeRouter.post("/regions/:regionId/stores", handleCreateStore);

export default storeRouter;