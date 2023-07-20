/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BadgeTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BadgeTypes" ALTER COLUMN "icon" SET DATA TYPE VARCHAR(1000);

-- CreateTable
CREATE TABLE "PointTransactionTypes" (
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "PointTransactionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTypes" (
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "TaskTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PointTransactionTypes_name_key" ON "PointTransactionTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TaskTypes_name_key" ON "TaskTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeTypes_name_key" ON "BadgeTypes"("name");
