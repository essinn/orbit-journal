/*
  Warnings:

  - Added the required column `mood` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('excited', 'happy', 'neutral', 'sad', 'angry');

-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "mood" "Mood" NOT NULL,
ADD COLUMN     "tags" TEXT[];
