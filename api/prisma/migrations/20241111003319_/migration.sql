/*
  Warnings:

  - You are about to drop the column `quantity_unit` on the `Menu_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu_item" DROP COLUMN "quantity_unit",
ADD COLUMN     "unit_measure" INTEGER;
