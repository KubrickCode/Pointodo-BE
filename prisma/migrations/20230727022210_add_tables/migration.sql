-- CreateTable
CREATE TABLE "UserBadgesLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "badgeId" INTEGER NOT NULL,

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
CREATE TABLE "PointsLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "pointTransactionTypesId" INTEGER NOT NULL,
    "points" SMALLINT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasksLogs" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "taskTypesId" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500),
    "completion" SMALLINT NOT NULL DEFAULT 0,
    "importance" SMALLINT NOT NULL DEFAULT 3,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TasksLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadgesLogs" ADD CONSTRAINT "UserBadgesLogs_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "BadgeTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeProgress" ADD CONSTRAINT "BadgeProgress_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "BadgeTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLogs" ADD CONSTRAINT "PointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLogs" ADD CONSTRAINT "PointsLogs_pointTransactionTypesId_fkey" FOREIGN KEY ("pointTransactionTypesId") REFERENCES "PointTransactionTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksLogs" ADD CONSTRAINT "TasksLogs_taskTypesId_fkey" FOREIGN KEY ("taskTypesId") REFERENCES "TaskTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
