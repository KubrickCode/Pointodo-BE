-- DropIndex
DROP INDEX "User_provider_createdAt_idx";

-- CreateIndex
CREATE INDEX "User_provider_idx" ON "User"("provider");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
