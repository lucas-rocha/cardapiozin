/*
  Warnings:

  - You are about to drop the column `image` on the `Order_additional_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order_additional_item" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Order_item" ALTER COLUMN "image" DROP NOT NULL;
