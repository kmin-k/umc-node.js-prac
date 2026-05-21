import { prisma } from "../../../prisma.js";
import { SignupRequestDTO } from "../dtos/user.dto.js";

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } });
};

export const createUser = async (
  data: SignupRequestDTO & { password: string }
): Promise<number> => {
  const created = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phoneNumber ?? null,
      address: data.address ?? null,
    },
  });
  return Number(created.id);
};

export const findUserById = async (userId: number) => {
  return prisma.users.findUnique({ where: { id: BigInt(userId) } });
};