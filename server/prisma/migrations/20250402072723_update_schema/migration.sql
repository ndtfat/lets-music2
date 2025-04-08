/*
  Warnings:

  - You are about to drop the column `createdById` on the `playlists` table. All the data in the column will be lost.
  - You are about to drop the column `uploaderId` on the `songs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_createdById_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_uploaderId_fkey";

-- AlterTable
ALTER TABLE "backgrounds" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "playlists" DROP COLUMN "createdById",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "uploaderId",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "user-settings" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;
