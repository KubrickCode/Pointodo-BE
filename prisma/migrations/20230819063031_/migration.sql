-- DropIndex
DROP INDEX "EarnedPointsLogs_occurredAt_idx";

-- DropIndex
DROP INDEX "EarnedPointsLogs_taskId_idx";

-- CreateIndex
CREATE INDEX "EarnedPointsLogs_taskId_occurredAt_idx" ON "EarnedPointsLogs"("taskId", "occurredAt");
