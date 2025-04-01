-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "reset_token" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT;
