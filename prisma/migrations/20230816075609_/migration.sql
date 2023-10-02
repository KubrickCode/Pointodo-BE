-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GOOGLE', 'KAKAO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MASTER');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('DAILY', 'DUE', 'FREE');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('NORMAL', 'ACHIEVEMENT', 'SPECIAL');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "selectedBadge" INTEGER NOT NULL DEFAULT 1,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "provider" "Provider" NOT NULL DEFAULT 'LOCAL',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "UserBadgesLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadgesLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeProgress" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "progress" SMALLINT NOT NULL DEFAULT 0,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarnedPointsLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "taskId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarnedPointsLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpentPointsLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpentPointsLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasksLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "taskType" "TaskType" NOT NULL DEFAULT 'DAILY',
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500),
    "completion" SMALLINT NOT NULL DEFAULT 0,
    "importance" SMALLINT NOT NULL DEFAULT 3,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "TasksLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasksDueDate" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "dueDate" VARCHAR(10) NOT NULL,

    CONSTRAINT "TasksDueDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_provider_idx" ON "User"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "Badge"("name");

-- CreateIndex
CREATE INDEX "Badge_type_idx" ON "Badge"("type");

-- CreateIndex
CREATE INDEX "UserBadgesLogs_userId_idx" ON "UserBadgesLogs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadgesLogs_userId_badgeId_key" ON "UserBadgesLogs"("userId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeProgress_userId_badgeId_key" ON "BadgeProgress"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "EarnedPointsLogs_userId_occurredAt_idx" ON "EarnedPointsLogs"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "SpentPointsLogs_userId_occurredAt_idx" ON "SpentPointsLogs"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "TasksLogs_userId_taskType_idx" ON "TasksLogs"("userId", "taskType");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedBadge_fkey" FOREIGN KEY ("selectedBadge") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointsLogs" ADD CONSTRAINT "EarnedPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointsLogs" ADD CONSTRAINT "EarnedPointsLogs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TasksLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksDueDate" ADD CONSTRAINT "TasksDueDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TasksLogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
