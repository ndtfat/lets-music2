/*
  Warnings:

  - Made the column `createdBy` on table `backgrounds` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `backgrounds` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `playlists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `playlists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `user-settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `user-settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "backgrounds" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "genres" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "playlists" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "user-settings" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;
