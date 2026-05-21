import { prisma } from "../../../prisma.js";

export const createMission = async (
  storeId: number,
  content: string,
  reward: number,
  deadline: string | null
): Promise<number> => {
  const created = await prisma.missions.create({
    data: {
      store_id: BigInt(storeId),
      content,
      reward,
      deadline: deadline ? new Date(deadline) : null,
    },
  });
  return Number(created.id);
};

export const findMissionById = async (missionId: number) => {
  return prisma.missions.findUnique({ where: { id: BigInt(missionId) } });
};

export const findUserMission = async (userId: number, missionId: number) => {
  return prisma.user_missions.findFirst({
    where: { user_id: BigInt(userId), mission_id: BigInt(missionId) },
  });
};

export const createUserMission = async (
  userId: number,
  missionId: number
): Promise<number> => {
  const created = await prisma.user_missions.create({
    data: {
      user_id: BigInt(userId),
      mission_id: BigInt(missionId),
      status: "ongoing",
    },
  });
  return Number(created.id);
};

export const findUserMissionById = async (id: number) => {
  return prisma.user_missions.findUnique({ where: { id: BigInt(id) } });
};

export const findMissionsByStoreId = async (storeId: number) => {
  return prisma.missions.findMany({
    where: { store_id: BigInt(storeId) },
    orderBy: { id: "desc" },
  });
};

export const findUserMissionsByStatus = async (
  userId: number,
  status: "ongoing" | "complete"
) => {
  return prisma.user_missions.findMany({
    where: { user_id: BigInt(userId), status },
    orderBy: { id: "desc" },
    include: { missions: { include: { stores: true } } },
  });
};

export const updateUserMissionToComplete = async (userMissionId: number) => {
  return prisma.user_missions.update({
    where: { id: BigInt(userMissionId) },
    data: { status: "complete" },
  });
};