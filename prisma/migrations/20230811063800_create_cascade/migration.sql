-- DropForeignKey
ALTER TABLE "BadgeProgress" DROP CONSTRAINT "BadgeProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "EarnedPointsLogs" DROP CONSTRAINT "EarnedPointsLogs_taskId_fkey";

-- DropForeignKey
ALTER TABLE "EarnedPointsLogs" DROP CONSTRAINT "EarnedPointsLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpentPointsLogs" DROP CONSTRAINT "SpentPointsLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "TasksDueDate" DROP CONSTRAINT "TasksDueDate_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TasksLogs" DROP CONSTRAINT "TasksLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadgesLogs" DROP CONSTRAINT "UserBadgesLogs_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointsLogs" ADD CONSTRAINT "EarnedPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointsLogs" ADD CONSTRAINT "EarnedPointsLogs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TasksLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksDueDate" ADD CONSTRAINT "TasksDueDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TasksLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
