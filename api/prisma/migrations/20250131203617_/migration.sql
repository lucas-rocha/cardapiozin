/*
  Warnings:

  - You are about to drop the column `menu_item_id` on the `Order_item` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order_item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT', 'DEBIT', 'PIX', 'MONEY');

-- DropForeignKey
ALTER TABLE "Order_item" DROP CONSTRAINT "Order_item_menu_item_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "review" INTEGER;

-- AlterTable
ALTER TABLE "Order_item" DROP COLUMN "menu_item_id",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "Order_additional_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "order_item_id" INTEGER NOT NULL,

    CONSTRAINT "Order_additional_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_additional_item" ADD CONSTRAINT "Order_additional_item_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "Order_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
