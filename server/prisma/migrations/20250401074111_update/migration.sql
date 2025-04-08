/*
  Warnings:

  - You are about to drop the `UserSetting` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userName" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserSetting";

-- CreateTable
CREATE TABLE "user-settings" (
    "user_id" TEXT NOT NULL,
    "theme" JSONB NOT NULL,
    "background_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-settings_user_id_key" ON "user-settings"("user_id");
