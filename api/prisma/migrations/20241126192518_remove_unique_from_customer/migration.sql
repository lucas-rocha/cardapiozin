/*
  Warnings:

  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "Customer_phone_key";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "email" SET NOT NULL;
