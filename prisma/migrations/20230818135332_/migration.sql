/*
  Warnings:

  - A unique constraint covering the columns `[userId,badgeId]` on the table `UserBadgesLogs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBadgesLogs_badgeId_userId_key";

-- DropIndex
DROP INDEX "UserBadgesLogs_userId_idx";

-- CreateIndex
CREATE INDEX "TasksLogs_name_idx" ON "TasksLogs"("name");

-- CreateIndex
CREATE INDEX "TasksLogs_occurredAt_idx" ON "TasksLogs"("occurredAt");

-- CreateIndex
CREATE INDEX "TasksLogs_importance_idx" ON "TasksLogs"("importance");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadgesLogs_userId_badgeId_key" ON "UserBadgesLogs"("userId", "badgeId");
