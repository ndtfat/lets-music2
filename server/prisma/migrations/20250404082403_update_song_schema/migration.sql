/*
  Warnings:

  - You are about to drop the `_GenreToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_B_fkey";

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "genres" TEXT[];

-- DropTable
DROP TABLE "_GenreToSong";

-- DropTable
DROP TABLE "genres";
