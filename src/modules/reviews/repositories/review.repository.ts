import { prisma } from "../../../prisma.js";

export const createReview = async (
  storeId: number,
  userId: number,
  score: number,
  content: string
): Promise<number> => {
  const created = await prisma.reviews.create({
    data: {
      store_id: BigInt(storeId),
      user_id: BigInt(userId),
      score,
      content,
    },
  });
  return Number(created.id);
};

export const findReviewById = async (reviewId: number) => {
  return prisma.reviews.findUnique({ where: { id: BigInt(reviewId) } });
};

export const findReviewsByUserId = async (userId: number) => {
  return prisma.reviews.findMany({
    where: { user_id: BigInt(userId) },
    orderBy: { id: "desc" },
    include: { stores: true },
  });
};
