-- AlterTable
ALTER TABLE "Restaurant_Hour" ADD COLUMN     "restaurant_id" TEXT;

-- AddForeignKey
ALTER TABLE "Restaurant_Hour" ADD CONSTRAINT "Restaurant_Hour_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
