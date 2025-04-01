/*
  Warnings:

  - You are about to drop the column `quantity` on the `Menu_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu_item" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Order_item" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
