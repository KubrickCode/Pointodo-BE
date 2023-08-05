-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GOOGLE', 'KAKAO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PointTransactionType" AS ENUM ('EARNED', 'SPENT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "defaultBadge" TEXT NOT NULL DEFAULT '기본 뱃지',
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "provider" "Provider" NOT NULL DEFAULT 'LOCAL',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "price" INTEGER,
    "iconLink" VARCHAR(1000) NOT NULL,

    CONSTRAINT "BadgeTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadgesLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeType" TEXT NOT NULL,

    CONSTRAINT "UserBadgesLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeProgress" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeType" TEXT NOT NULL,
    "progress" SMALLINT NOT NULL DEFAULT 0,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "transactionType" "PointTransactionType" NOT NULL,
    "taskType" TEXT NOT NULL,
    "points" SMALLINT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "TaskTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasksLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "taskType" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500),
    "completion" SMALLINT NOT NULL DEFAULT 0,
    "importance" SMALLINT NOT NULL DEFAULT 3,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TasksLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeTypes_name_key" ON "BadgeTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TaskTypes_name_key" ON "TaskTypes"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultBadge_fkey" FOREIGN KEY ("defaultBadge") REFERENCES "BadgeTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_badgeType_fkey" FOREIGN KEY ("badgeType") REFERENCES "BadgeTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_badgeType_fkey" FOREIGN KEY ("badgeType") REFERENCES "BadgeTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLogs" ADD CONSTRAINT "PointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLogs" ADD CONSTRAINT "PointsLogs_taskType_fkey" FOREIGN KEY ("taskType") REFERENCES "TaskTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_taskType_fkey" FOREIGN KEY ("taskType") REFERENCES "TaskTypes"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
