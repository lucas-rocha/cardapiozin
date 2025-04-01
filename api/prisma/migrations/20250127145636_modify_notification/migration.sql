/*
  Warnings:

  - Made the column `restaurant_id` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "restaurant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
