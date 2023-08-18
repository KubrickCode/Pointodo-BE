-- DropIndex
DROP INDEX "TasksLogs_userId_idx";

-- CreateIndex
CREATE INDEX "TasksLogs_taskType_idx" ON "TasksLogs"("taskType");
