/*
  Warnings:

  - Changed the type of `dueDate` on the `TasksDueDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TasksDueDate" DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" VARCHAR(10) NOT NULL;
