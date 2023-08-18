-- DropIndex
DROP INDEX "TasksLogs_userId_taskType_name_idx";

-- CreateIndex
CREATE INDEX "TasksLogs_userId_taskType_idx" ON "TasksLogs"("userId", "taskType");

-- CreateIndex
CREATE INDEX "TasksLogs_name_idx" ON "TasksLogs"("name");

-- CreateIndex
CREATE INDEX "TasksLogs_occurredAt_idx" ON "TasksLogs"("occurredAt");

-- CreateIndex
CREATE INDEX "TasksLogs_importance_idx" ON "TasksLogs"("importance");
