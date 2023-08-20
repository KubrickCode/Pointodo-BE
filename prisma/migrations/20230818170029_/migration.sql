/*
  Warnings:

  - You are about to drop the column `userId` on the `EarnedPointsLogs` table. All the data in the column will be lost.
  - You are about to drop the column `badgeId` on the `SpentPointsLogs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SpentPointsLogs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `TasksDueDate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `badgeLogId` to the `SpentPointsLogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EarnedPointsLogs" DROP CONSTRAINT "EarnedPointsLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpentPointsLogs" DROP CONSTRAINT "SpentPointsLogs_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "SpentPointsLogs" DROP CONSTRAINT "SpentPointsLogs_userId_fkey";

-- DropIndex
DROP INDEX "EarnedPointsLogs_userId_occurredAt_idx";

-- DropIndex
DROP INDEX "SpentPointsLogs_userId_occurredAt_idx";

-- AlterTable
ALTER TABLE "Badge" ALTER COLUMN "description" SET DEFAULT '뱃지 설명',
ALTER COLUMN "iconLink" SET DEFAULT '뱃지 아이콘 링크';

-- AlterTable
ALTER TABLE "EarnedPointsLogs" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "SpentPointsLogs" DROP COLUMN "badgeId",
DROP COLUMN "userId",
ADD COLUMN     "badgeLogId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TasksDueDate" ALTER COLUMN "dueDate" SET DEFAULT '2099-12-31';

-- AlterTable
ALTER TABLE "TasksLogs" ALTER COLUMN "name" SET DEFAULT '작업 이름';

-- CreateIndex
CREATE INDEX "EarnedPointsLogs_occurredAt_idx" ON "EarnedPointsLogs"("occurredAt");

-- CreateIndex
CREATE INDEX "SpentPointsLogs_occurredAt_idx" ON "SpentPointsLogs"("occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "TasksDueDate_taskId_key" ON "TasksDueDate"("taskId");

-- CreateIndex
CREATE INDEX "TasksLogs_userId_taskType_idx" ON "TasksLogs"("userId", "taskType");

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_badgeLogId_fkey" FOREIGN KEY ("badgeLogId") REFERENCES "UserBadgesLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
