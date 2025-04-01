/*
  Warnings:

  - You are about to drop the column `created_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Menu_Item_Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDefault` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Item_Category" DROP CONSTRAINT "Menu_Item_Category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Item_Category" DROP CONSTRAINT "Menu_Item_Category_menu_item_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "created_at",
DROP COLUMN "image",
DROP COLUMN "restaurant_id",
DROP COLUMN "updated_at",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Menu_Item_Category";

-- CreateTable
CREATE TABLE "Menu_Item_Category_Restaurant" (
    "menu_item_id" INTEGER NOT NULL,
    "category_restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "Menu_Item_Category_Restaurant_pkey" PRIMARY KEY ("menu_item_id","category_restaurant_id")
);

-- CreateTable
CREATE TABLE "Category_Restaurant" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "customImageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu_Item_Category_Restaurant" ADD CONSTRAINT "Menu_Item_Category_Restaurant_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item_Category_Restaurant" ADD CONSTRAINT "Menu_Item_Category_Restaurant_category_restaurant_id_fkey" FOREIGN KEY ("category_restaurant_id") REFERENCES "Category_Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Restaurant" ADD CONSTRAINT "Category_Restaurant_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Restaurant" ADD CONSTRAINT "Category_Restaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
