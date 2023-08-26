/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPassword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `UserPassword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_userId_key" ON "UserPassword"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_password_key" ON "UserPassword"("password");
