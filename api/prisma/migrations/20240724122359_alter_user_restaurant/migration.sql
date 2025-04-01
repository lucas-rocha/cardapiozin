/*
  Warnings:

  - The primary key for the `User_Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User_Restaurant` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OWNER';

-- AlterTable
ALTER TABLE "User_Restaurant" DROP CONSTRAINT "User_Restaurant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_Restaurant_pkey" PRIMARY KEY ("user_id", "restaurant_id");
