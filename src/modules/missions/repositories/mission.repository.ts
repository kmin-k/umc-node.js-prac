import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface MissionRow extends RowDataPacket {
  id: number;
  store_id: number;
  content: string;
  reward: number;
  deadline: Date | null;
  created_at: Date;
}

interface UserMissionRow extends RowDataPacket {
  id: number;
  user_id: number;
  mission_id: number;
  status: "ongoing" | "complete";
  created_at: Date;
}

// ====== 미션 ======
export const createMission = async (
  storeId: number,
  content: string,
  reward: number,
  deadline: string | null
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO missions (store_id, content, reward, deadline) VALUES (?, ?, ?, ?)",
    [storeId, content, reward, deadline]
  );
  return result.insertId;
};

export const findMissionById = async (missionId: number) => {
  const [rows] = await pool.query<MissionRow[]>(
    "SELECT * FROM missions WHERE id = ?",
    [missionId]
  );
  return rows[0] ?? null;
};

// ====== 유저 미션 (도전) ======
export const findUserMission = async (userId: number, missionId: number) => {
  const [rows] = await pool.query<UserMissionRow[]>(
    "SELECT * FROM user_missions WHERE user_id = ? AND mission_id = ?",
    [userId, missionId]
  );
  return rows[0] ?? null;
};

export const createUserMission = async (
  userId: number,
  missionId: number
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO user_missions (user_id, mission_id, status) VALUES (?, ?, 'ongoing')",
    [userId, missionId]
  );
  return result.insertId;
};

export const findUserMissionById = async (id: number) => {
  const [rows] = await pool.query<UserMissionRow[]>(
    "SELECT * FROM user_missions WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};