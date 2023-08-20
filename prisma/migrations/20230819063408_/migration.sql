-- DropIndex
DROP INDEX "EarnedPointsLogs_taskId_occurredAt_idx";

-- CreateIndex
CREATE INDEX "EarnedPointsLogs_taskId_idx" ON "EarnedPointsLogs"("taskId");

-- CreateIndex
CREATE INDEX "EarnedPointsLogs_occurredAt_idx" ON "EarnedPointsLogs"("occurredAt");
