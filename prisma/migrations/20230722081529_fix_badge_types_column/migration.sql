/*
  Warnings:

  - You are about to drop the column `icon` on the `BadgeTypes` table. All the data in the column will be lost.
  - Added the required column `iconLink` to the `BadgeTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BadgeTypes" DROP COLUMN "icon",
ADD COLUMN     "iconLink" VARCHAR(1000) NOT NULL;
