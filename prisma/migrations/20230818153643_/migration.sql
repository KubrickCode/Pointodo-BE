-- DropIndex
DROP INDEX "TasksLogs_userId_taskType_idx";

-- CreateIndex
CREATE INDEX "TasksLogs_userId_taskType_name_idx" ON "TasksLogs"("userId", "taskType", "name");
