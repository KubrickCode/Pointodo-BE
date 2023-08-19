/*
  Warnings:

  - A unique constraint covering the columns `[badgeLogId]` on the table `SpentPointsLogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SpentPointsLogs_badgeLogId_key" ON "SpentPointsLogs"("badgeLogId");
