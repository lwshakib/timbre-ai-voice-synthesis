-- CreateEnum
CREATE TYPE "VoiceCategory" AS ENUM ('PREMIUM', 'PROFESSIONAL', 'CUSTOM', 'AUDIOBOOK', 'CONVERSATIONAL', 'CUSTOMER_SERVICE', 'GENERAL', 'NARRATIVE', 'CORPORATE', 'CHARACTERS', 'VOICEOVER', 'MEDITATION', 'MOTIVATIONAL', 'PODCAST', 'ADVERTISING');

-- CreateTable
CREATE TABLE "voice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "VoiceCategory",
    "language" TEXT,
    "variant" TEXT NOT NULL,
    "orgId" TEXT,
    "r2ObjectKey" TEXT,

    CONSTRAINT "voice_pkey" PRIMARY KEY ("id")
);
