/*
  Warnings:

  - A unique constraint covering the columns `[userId,badgeId]` on the table `UserBadgesLogs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBadgesLogs_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBadgesLogs_userId_badgeId_key" ON "UserBadgesLogs"("userId", "badgeId");
