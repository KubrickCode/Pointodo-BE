-- DropIndex
DROP INDEX "TasksLogs_name_idx";

-- DropIndex
DROP INDEX "TasksLogs_occurredAt_idx";

-- DropIndex
DROP INDEX "TasksLogs_userId_taskType_importance_idx";

-- CreateIndex
CREATE INDEX "TasksLogs_userId_taskType_idx" ON "TasksLogs"("userId", "taskType");
