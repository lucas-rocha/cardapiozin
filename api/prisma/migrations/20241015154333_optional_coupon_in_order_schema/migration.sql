-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_coupon_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "coupon_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
