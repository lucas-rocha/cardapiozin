-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_user_id_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
