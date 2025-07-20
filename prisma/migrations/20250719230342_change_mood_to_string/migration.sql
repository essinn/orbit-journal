/*
  Warnings:

  - Changed the type of `mood` on the `Journal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "mood",
ADD COLUMN     "mood" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Mood";
