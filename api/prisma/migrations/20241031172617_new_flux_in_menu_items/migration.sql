/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Category_Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu_Item_Category_Restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category_Restaurant" DROP CONSTRAINT "Category_Restaurant_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Category_Restaurant" DROP CONSTRAINT "Category_Restaurant_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Item_Category_Restaurant" DROP CONSTRAINT "Menu_Item_Category_Restaurant_category_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Item_Category_Restaurant" DROP CONSTRAINT "Menu_Item_Category_Restaurant_menu_item_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageUrl",
DROP COLUMN "isDefault",
ADD COLUMN     "category_image_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "restaurant_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Menu_item" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "serving" INTEGER,
ADD COLUMN     "unit_id" INTEGER,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Category_Restaurant";

-- DropTable
DROP TABLE "Menu_Item_Category_Restaurant";

-- CreateTable
CREATE TABLE "Category_Image" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Category_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_item_Category" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,

    CONSTRAINT "Menu_item_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional_Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "Additional_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_Item_Additional_Item" (
    "id" SERIAL NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "additional_item_id" INTEGER NOT NULL,
    "add_item" BOOLEAN NOT NULL,
    "remove_item" BOOLEAN NOT NULL,

    CONSTRAINT "Menu_Item_Additional_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu_item" ADD CONSTRAINT "Menu_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_category_image_id_fkey" FOREIGN KEY ("category_image_id") REFERENCES "Category_Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_item_Category" ADD CONSTRAINT "Menu_item_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_item_Category" ADD CONSTRAINT "Menu_item_Category_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additional_Item" ADD CONSTRAINT "Additional_Item_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item_Additional_Item" ADD CONSTRAINT "Menu_Item_Additional_Item_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item_Additional_Item" ADD CONSTRAINT "Menu_Item_Additional_Item_additional_item_id_fkey" FOREIGN KEY ("additional_item_id") REFERENCES "Additional_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
