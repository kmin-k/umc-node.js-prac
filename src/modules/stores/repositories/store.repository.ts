import { prisma } from "../../../prisma.js";

export const findRegionById = async (regionId: number) => {
  return prisma.regions.findUnique({ where: { id: BigInt(regionId) } });
};

export const createStore = async (
  regionId: number,
  name: string,
  address: string | null
): Promise<number> => {
  const created = await prisma.stores.create({
    data: { region_id: BigInt(regionId), name, address },
  });
  return Number(created.id);
};

export const findStoreById = async (storeId: number) => {
  return prisma.stores.findUnique({ where: { id: BigInt(storeId) } });
};