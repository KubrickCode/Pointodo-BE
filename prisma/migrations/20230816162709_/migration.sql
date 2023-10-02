/*
  Warnings:

  - You are about to drop the column `selectedBadge` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedBadge_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "selectedBadge",
ADD COLUMN     "selectedBadgeId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedBadgeId_fkey" FOREIGN KEY ("selectedBadgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
