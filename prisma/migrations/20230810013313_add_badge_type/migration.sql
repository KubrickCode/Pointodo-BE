/*
  Warnings:

  - You are about to drop the `BadgeTypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('NORMAL', 'ACHIEVEMENT', 'SPECIAL');

-- DropForeignKey
ALTER TABLE "BadgeProgress" DROP CONSTRAINT "BadgeProgress_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "SpentPointsLogs" DROP CONSTRAINT "SpentPointsLogs_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedBadge_fkey";

-- DropForeignKey
ALTER TABLE "UserBadgesLogs" DROP CONSTRAINT "UserBadgesLogs_badgeId_fkey";

-- DropTable
DROP TABLE "BadgeTypes";

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "price" INTEGER,
    "iconLink" VARCHAR(1000) NOT NULL,
    "type" "BadgeType" NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "Badge"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedBadge_fkey" FOREIGN KEY ("selectedBadge") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
