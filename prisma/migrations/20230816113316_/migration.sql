/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `TasksDueDate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TasksDueDate_taskId_key" ON "TasksDueDate"("taskId");
