-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REFUSED');

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING';
