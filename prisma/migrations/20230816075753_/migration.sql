/*
  Warnings:

  - A unique constraint covering the columns `[badgeId,userId]` on the table `UserBadgesLogs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBadgesLogs_userId_badgeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBadgesLogs_badgeId_userId_key" ON "UserBadgesLogs"("badgeId", "userId");
