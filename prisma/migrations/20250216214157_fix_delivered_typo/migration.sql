/*
  Warnings:

  - You are about to drop the column `isDelievered` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isDelievered",
ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false;
