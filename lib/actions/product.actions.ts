"use server";
import { PrismaClient } from "@prisma/client";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return data;
}
