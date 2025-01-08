/*
  Warnings:

  - You are about to drop the column `isFeatures` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isFeatures",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
