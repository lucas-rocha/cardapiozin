/*
  Warnings:

  - The primary key for the `Menu_item_Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Menu_item_Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu_item_Category" DROP CONSTRAINT "Menu_item_Category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Menu_item_Category_pkey" PRIMARY KEY ("category_id", "menu_item_id");
