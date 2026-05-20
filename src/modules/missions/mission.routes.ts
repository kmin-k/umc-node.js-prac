import { Router } from "express";
import {
  handleCreateMission,
  handleChallengeMission,
} from "./controllers/mission.controller.js";

const missionRouter = Router();

// POST /api/v1/stores/:storeId/missions
missionRouter.post("/stores/:storeId/missions", handleCreateMission);

// POST /api/v1/users/:userId/missions (신규)
missionRouter.post("/users/:userId/missions", handleChallengeMission);

export default missionRouter;