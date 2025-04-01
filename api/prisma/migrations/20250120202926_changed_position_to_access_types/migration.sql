/*
  Warnings:

  - You are about to drop the column `position` on the `User_Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User_Restaurant" DROP COLUMN "position",
ADD COLUMN     "accessType" TEXT;
