/*
  Warnings:

  - You are about to drop the column `r2ObjectKey` on the `generation` table. All the data in the column will be lost.
  - You are about to drop the column `r2ObjectKey` on the `voice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "generation" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "path" TEXT;

-- AlterTable
ALTER TABLE "voice" DROP COLUMN "r2ObjectKey",
ADD COLUMN     "path" TEXT;
