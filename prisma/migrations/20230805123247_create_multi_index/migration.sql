/*
  Warnings:

  - A unique constraint covering the columns `[userId,badgeType]` on the table `BadgeProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BadgeProgress_userId_badgeType_key" ON "BadgeProgress"("userId", "badgeType");
