/*
  Warnings:

  - You are about to drop the column `customImageCategoryDefaultUrl` on the `Category_Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category_Restaurant" DROP COLUMN "customImageCategoryDefaultUrl",
ADD COLUMN     "imageUrl" TEXT;
