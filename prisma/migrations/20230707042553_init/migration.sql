-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Local', 'Google', 'Kakao');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'Local',
    "role" "Role" NOT NULL DEFAULT 'User',
    "defaultBadgeId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeTypes" (
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(20) NOT NULL,

    CONSTRAINT "BadgeTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_defaultBadgeId_fkey" FOREIGN KEY ("defaultBadgeId") REFERENCES "BadgeTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
