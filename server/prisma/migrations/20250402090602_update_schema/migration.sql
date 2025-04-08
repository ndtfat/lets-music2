/*
  Warnings:

  - You are about to drop the column `theme` on the `user-settings` table. All the data in the column will be lost.
  - Added the required column `theme_color` to the `user-settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user-settings" DROP COLUMN "theme",
ADD COLUMN     "theme_color" TEXT NOT NULL;
