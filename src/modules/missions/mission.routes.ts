import { Router } from "express";
import {
  handleCreateMission,
  handleChallengeMission,
  handleGetStoreMissions,
  handleGetMyMissions,
  handleCompleteMission,
} from "./controllers/mission.controller.js";

const missionRouter = Router();

missionRouter.post("/stores/:storeId/missions", handleCreateMission);
missionRouter.post("/users/:userId/missions", handleChallengeMission);
missionRouter.get("/stores/:storeId/missions", handleGetStoreMissions);
missionRouter.get("/users/:userId/missions", handleGetMyMissions);
missionRouter.patch("/users/:userId/missions/:missionId", handleCompleteMission);

export default missionRouter;