/*
  Warnings:

  - The primary key for the `user-settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user-settings` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user-settings_user_id_key";

-- AlterTable
ALTER TABLE "user-settings" DROP CONSTRAINT "user-settings_pkey",
DROP COLUMN "user_id",
ADD CONSTRAINT "user-settings_pkey" PRIMARY KEY ("createdBy");
