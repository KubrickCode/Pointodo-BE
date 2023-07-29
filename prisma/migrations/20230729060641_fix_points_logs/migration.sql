/*
  Warnings:

  - Added the required column `taskTypesId` to the `PointsLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointsLogs" ADD COLUMN     "taskTypesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PointsLogs" ADD CONSTRAINT "PointsLogs_taskTypesId_fkey" FOREIGN KEY ("taskTypesId") REFERENCES "TaskTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
