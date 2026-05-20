import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface ReviewRow extends RowDataPacket {
  id: number;
  store_id: number;
  user_id: number;
  score: string;
  content: string;
  created_at: Date;
}

// 리뷰 생성
export const createReview = async (
  storeId: number,
  userId: number,
  score: number,
  content: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO reviews (store_id, user_id, score, content) VALUES (?, ?, ?, ?)",
    [storeId, userId, score, content]
  );
  return result.insertId;
};

// 리뷰 단건 조회
export const findReviewById = async (reviewId: number) => {
  const [rows] = await pool.query<ReviewRow[]>(
    "SELECT * FROM reviews WHERE id = ?",
    [reviewId]
  );
  return rows[0] ?? null;
};