import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/user.repository.js";
import { SignupRequestDTO, SignupResponseDTO } from "../dtos/user.dto.js";

export const signupUser = async (
  data: SignupRequestDTO
): Promise<SignupResponseDTO> => {
  // 1. 이메일 중복 체크
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }

  // 2. 비밀번호 해싱 (강도 10)
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 3. DB에 저장
  const userId = await createUser({
    ...data,
    password: hashedPassword,
  });

  return {
    userId,
    name: data.name,
    email: data.email,
  };
};