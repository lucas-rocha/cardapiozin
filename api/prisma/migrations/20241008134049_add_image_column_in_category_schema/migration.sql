/*
  Warnings:

  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `restaurant_id` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "restaurant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
