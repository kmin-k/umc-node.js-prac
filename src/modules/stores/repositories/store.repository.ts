import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface RegionRow extends RowDataPacket {
  id: number;
  name: string;
}

interface StoreRow extends RowDataPacket {
  id: number;
  region_id: number;
  name: string;
  address: string | null;
  score: string;
  created_at: Date;
}

// 지역 존재 확인
export const findRegionById = async (regionId: number) => {
  const [rows] = await pool.query<RegionRow[]>(
    "SELECT * FROM regions WHERE id = ?",
    [regionId]
  );
  return rows[0] ?? null;
};

// 가게 생성
export const createStore = async (
  regionId: number,
  name: string,
  address: string | null
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO stores (region_id, name, address) VALUES (?, ?, ?)",
    [regionId, name, address]
  );
  return result.insertId;
};

// 가게 단건 조회
export const findStoreById = async (storeId: number) => {
  const [rows] = await pool.query<StoreRow[]>(
    "SELECT * FROM stores WHERE id = ?",
    [storeId]
  );
  return rows[0] ?? null;
};