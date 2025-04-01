/*
  Warnings:

  - You are about to drop the `Customer_Restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer_Restaurant" DROP CONSTRAINT "Customer_Restaurant_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer_Restaurant" DROP CONSTRAINT "Customer_Restaurant_restaurant_id_fkey";

-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "Customer_phone_key";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "restaurant_id" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "Customer_Restaurant";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
