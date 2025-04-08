/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `user-settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user-settings_createdBy_key" ON "user-settings"("createdBy");

-- AddForeignKey
ALTER TABLE "user-settings" ADD CONSTRAINT "user-settings_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
