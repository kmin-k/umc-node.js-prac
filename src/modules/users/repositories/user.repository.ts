import { pool } from "../../../db.config.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { SignupRequestDTO } from "../dtos/user.dto.js";

// 이메일로 유저 찾기 (중복 체크용)
export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] ?? null;
};

// 유저 생성 (이미 해싱된 비밀번호를 받음)
export const createUser = async (
  data: SignupRequestDTO & { password: string }
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO users (name, email, password, phone_number, address) VALUES (?, ?, ?, ?, ?)`,
    [
      data.name,
      data.email,
      data.password,
      data.phoneNumber ?? null,
      data.address ?? null,
    ]
  );
  return result.insertId;
};

// 유저 ID로 조회 (다른 모듈에서 검증용으로 사용)
export const findUserById = async (userId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );
  return rows[0] ?? null;
};