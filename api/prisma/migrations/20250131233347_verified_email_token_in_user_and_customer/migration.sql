-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verification_token" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false;
