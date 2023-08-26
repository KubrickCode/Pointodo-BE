/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `EarnedPointsLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SpentPointsLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EarnedPointsLogs" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "SpentPointsLogs" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "UserPassword" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointsLogs" ADD CONSTRAINT "EarnedPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpentPointsLogs" ADD CONSTRAINT "SpentPointsLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
