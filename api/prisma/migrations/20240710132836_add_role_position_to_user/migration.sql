-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "position" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
