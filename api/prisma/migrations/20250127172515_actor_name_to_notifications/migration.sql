/*
  Warnings:

  - Added the required column `actorName` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "actorName" TEXT NOT NULL;
