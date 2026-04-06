import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { 
    S3Client, 
    CreateBucketCommand, 
    PutObjectCommand, 
    HeadBucketCommand,
    type PutObjectCommandInput 
} from "@aws-sdk/client-s3";

import type { VoiceCategory } from "../generated/prisma/client";
import prisma from "../lib/prisma";
import { CANONICAL_SYSTEM_VOICE_NAMES } from "../lib/voice-scoping";

// Standard S3 environment variables
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_ENDPOINT,
    AWS_S3_BUCKET_NAME,
    AWS_REGION = "auto"
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
    console.error("Missing required S3 environment variables.");
    process.exit(1);
}

const s3Client = new S3Client({
    region: AWS_REGION,
    endpoint: AWS_ENDPOINT || undefined,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const VOICES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/system-voices",
);

interface VoiceMetadata {
  description: string;
  category: VoiceCategory;
  language: string;
}

const systemVoiceMetadata: Record<string, VoiceMetadata> = {
  Aaron: {
    description: "Soothing and calm, like a self-help audiobook narrator",
    category: "AUDIOBOOK",
    language: "en-US",
  },
  Abigail: {
    description: "Friendly and conversational with a warm, approachable tone",
    category: "CONVERSATIONAL",
    language: "en-GB",
  },
  Anaya: {
    description: "Polite and professional, suited for customer service",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Andy: {
    description: "Versatile and clear, a reliable all-purpose narrator",
    category: "GENERAL",
    language: "en-US",
  },
  Archer: {
    description: "Laid-back and reflective with a steady, storytelling pace",
    category: "NARRATIVE",
    language: "en-US",
  },
  Brian: {
    description: "Professional and helpful with a clear customer support tone",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Chloe: {
    description: "Bright and bubbly with a cheerful, outgoing personality",
    category: "CORPORATE",
    language: "en-AU",
  },
  Dylan: {
    description:
      "Thoughtful and intimate, like a quiet late-night conversation",
    category: "GENERAL",
    language: "en-US",
  },
  Emmanuel: {
    description: "Nasally and distinctive with a quirky, cartoon-like quality",
    category: "CHARACTERS",
    language: "en-US",
  },
  Ethan: {
    description: "Polished and warm with crisp, studio-quality delivery",
    category: "VOICEOVER",
    language: "en-US",
  },
  Evelyn: {
    description: "Warm Southern charm with a heartfelt, down-to-earth feel",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Gavin: {
    description: "Calm and reassuring with a smooth, natural flow",
    category: "MEDITATION",
    language: "en-US",
  },
  Gordon: {
    description: "Warm and encouraging with an uplifting, motivational tone",
    category: "MOTIVATIONAL",
    language: "en-US",
  },
  Ivan: {
    description: "Deep and cinematic with a dramatic, movie-character presence",
    category: "CHARACTERS",
    language: "ru-RU",
  },
  Laura: {
    description: "Authentic and warm with a conversational Midwestern tone",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Lucy: {
    description: "Direct and composed with a professional phone manner",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Madison: {
    description: "Energetic and unfiltered with a casual, chatty vibe",
    category: "PODCAST",
    language: "en-US",
  },
  Marisol: {
    description: "Confident and polished with a persuasive, ad-ready delivery",
    category: "ADVERTISING",
    language: "en-US",
  },
  Meera: {
    description: "Friendly and helpful with a clear, service-oriented tone",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Walter: {
    description: "Old and raspy with deep gravitas, like a wise grandfather",
    category: "NARRATIVE",
    language: "en-US",
  },
};

async function ensureBucket() {
    try {
        await s3Client.send(new HeadBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));
        console.log(`Bucket "${AWS_S3_BUCKET_NAME}" already exists.`);
    } catch (error: any) {
        if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
            console.log(`Creating bucket "${AWS_S3_BUCKET_NAME}"...`);
            await s3Client.send(new CreateBucketCommand({ Bucket: AWS_S3_BUCKET_NAME }));
            console.log(`Bucket created.`);
        } else {
            throw error;
        }
    }
}

async function seedSystemVoice(name: string) {
    const filePath = path.join(VOICES_DIR, `${name}.wav`);
    let buffer: Buffer;
    try {
        buffer = await fs.readFile(filePath);
    } catch (error) {
        console.error(`Could not locate audio asset for system voice: ${name}.wav`);
        throw error;
    }

    const existingSystemVoice = await prisma.voice.findFirst({
        where: {
            variant: "SYSTEM",
            name,
        },
        select: { id: true },
    });

    if (existingSystemVoice) {
        const objectKey = `voices/system/${existingSystemVoice.id}`;
        const meta = systemVoiceMetadata[name];

        console.log(`- Updating existing voice: ${name}`);

        await s3Client.send(new PutObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: objectKey,
            Body: buffer,
            ContentType: "audio/wav",
        }));

        await prisma.voice.update({
            where: { id: existingSystemVoice.id },
            data: {
                path: objectKey,
                ...(meta && {
                    description: meta.description,
                    category: meta.category,
                    language: meta.language,
                }),
            },
        });
        return;
    }

    const meta = systemVoiceMetadata[name];
    console.log(`- Creating new voice: ${name}`);

    const voice = await prisma.voice.create({
        data: {
            name,
            variant: "SYSTEM",
            organizationId: null,
            ...(meta && {
                description: meta.description,
                category: meta.category,
                language: meta.language,
            }),
        },
        select: {
            id: true,
        },
    });

    const objectKey = `voices/system/${voice.id}`;

    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: objectKey,
            Body: buffer,
            ContentType: "audio/wav",
        }));

        await prisma.voice.update({
            where: { id: voice.id },
            data: { path: objectKey },
        });
    } catch (error) {
        await prisma.voice.delete({ where: { id: voice.id } }).catch(() => {});
        throw error;
    }
}

async function seedSystemVoices() {
    console.log(`Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`);
    for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
        await seedSystemVoice(name);
    }
}

async function main() {
    console.log("--- BUCKET SETUP INITIALIZED ---");
    try {
        await ensureBucket();
        await seedSystemVoices();
        console.log("--- BUCKET SETUP COMPLETED ---");
    } catch (error) {
        console.error("--- BUCKET SETUP FAILED ---");
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
