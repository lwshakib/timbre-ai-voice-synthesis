/*
  Warnings:

  - You are about to drop the column `orgId` on the `voice` table. All the data in the column will be lost.
  - The `variant` column on the `voice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VoiceVariant" AS ENUM ('SYSTEM', 'CUSTOM');

-- AlterTable
ALTER TABLE "voice" DROP COLUMN "orgId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "category" SET DEFAULT 'GENERAL',
ALTER COLUMN "language" SET DEFAULT 'en-US',
DROP COLUMN "variant",
ADD COLUMN     "variant" "VoiceVariant" NOT NULL DEFAULT 'SYSTEM';

-- CreateTable
CREATE TABLE "generation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voiceId" TEXT,
    "text" TEXT NOT NULL,
    "voiceName" TEXT NOT NULL,
    "r2ObjectKey" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "topK" INTEGER NOT NULL,
    "repetitionPenalty" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "generation_userId_idx" ON "generation"("userId");

-- CreateIndex
CREATE INDEX "generation_voiceId_idx" ON "generation"("voiceId");

-- CreateIndex
CREATE INDEX "voice_variant_idx" ON "voice"("variant");

-- CreateIndex
CREATE INDEX "voice_userId_idx" ON "voice"("userId");

-- AddForeignKey
ALTER TABLE "voice" ADD CONSTRAINT "voice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generation" ADD CONSTRAINT "generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generation" ADD CONSTRAINT "generation_voiceId_fkey" FOREIGN KEY ("voiceId") REFERENCES "voice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
