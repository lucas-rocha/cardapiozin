/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog_post" DROP CONSTRAINT "Blog_post_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_item" DROP CONSTRAINT "Menu_item_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_user_id_fkey";

-- AlterTable
ALTER TABLE "Blog_post" ALTER COLUMN "restaurant_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Menu_item" ALTER COLUMN "restaurant_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "restaurant_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "user_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Restaurant_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "position",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "User_Restaurant" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "position" TEXT,

    CONSTRAINT "User_Restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Restaurant" ADD CONSTRAINT "User_Restaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Restaurant" ADD CONSTRAINT "User_Restaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_item" ADD CONSTRAINT "Menu_item_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog_post" ADD CONSTRAINT "Blog_post_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
