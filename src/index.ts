import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { RegisterRoutes } from "../build/routes.js";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

RegisterRoutes(app);

const swaggerDoc = JSON.parse(fs.readFileSync("./build/swagger.json", "utf-8"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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