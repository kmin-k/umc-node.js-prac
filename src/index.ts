import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./modules/users/user.routes.js";
import storeRouter from "./modules/stores/store.routes.js";
import reviewRouter from "./modules/reviews/review.routes.js";
import missionRouter from "./modules/missions/mission.routes.js";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1", storeRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", missionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    isSuccess: false,
    code: err.statusCode || 500,
    message: err.message || "서버 오류",
  });
});

app.listen(port, () => {
  console.log(`[server]: http://localhost:${port}`);
});