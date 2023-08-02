/*
  Warnings:

  - You are about to drop the column `defaultBadge` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_defaultBadge_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultBadge",
ADD COLUMN     "selectedBadge" TEXT NOT NULL DEFAULT '기본 뱃지';

-- CreateIndex
CREATE INDEX "PointsLogs_userId_occurredAt_transactionType_idx" ON "PointsLogs"("userId", "occurredAt", "transactionType");

-- CreateIndex
CREATE INDEX "TasksLogs_userId_idx" ON "TasksLogs"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedBadge_fkey" FOREIGN KEY ("selectedBadge") REFERENCES "BadgeTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
