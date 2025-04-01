/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_url]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Restaurant_restaurant_name_key";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "background_url" TEXT,
ADD COLUMN     "brand_color" TEXT,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "restaurant_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurant_url_key" ON "Restaurant"("restaurant_url");
