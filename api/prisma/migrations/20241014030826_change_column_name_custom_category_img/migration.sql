/*
  Warnings:

  - You are about to drop the column `customImageUrl` on the `Category_Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category_Restaurant" DROP COLUMN "customImageUrl",
ADD COLUMN     "customImageCategoryDefaultUrl" TEXT;
