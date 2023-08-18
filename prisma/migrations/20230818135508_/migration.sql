-- DropIndex
DROP INDEX "User_provider_idx";

-- CreateIndex
CREATE INDEX "User_provider_createdAt_idx" ON "User"("provider", "createdAt");
