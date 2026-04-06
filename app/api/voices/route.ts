import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { VoiceVariant, VoiceCategory } from "@/generated/prisma/enums";
import { uploadAudio } from "@/lib/s3";
import { z } from "zod";

const createVoiceSchema = z.object({
  name: z.string().min(1, "Voice name is required"),
  category: z.nativeEnum(VoiceCategory).default(VoiceCategory.GENERAL),
  language: z.string().min(1, "Language is required"),
  description: z.string().optional(),
});

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  const searchFilter = query
    ? {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  try {
    const [custom, system] = await Promise.all([
      prisma.voice.findMany({
        where: {
          variant: VoiceVariant.CUSTOM,
          userId: session?.user?.id,
          ...searchFilter,
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          language: true,
          variant: true,
          r2ObjectKey: true,
        },
      }),
      prisma.voice.findMany({
        where: {
          variant: VoiceVariant.SYSTEM,
          ...searchFilter,
        },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          language: true,
          variant: true,
          r2ObjectKey: true,
        },
      }),
    ]);

    return NextResponse.json({ custom, system });
  } catch (error) {
    console.error("Failed to fetch voices:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const validation = createVoiceSchema.safeParse({
      name: searchParams.get("name"),
      category: searchParams.get("category") || undefined,
      language: searchParams.get("language"),
      description: searchParams.get("description") || undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", issues: validation.error.issues }, { status: 400 });
    }

    const { name, category, language, description } = validation.data;
    const fileBuffer = await request.arrayBuffer();

    if (!fileBuffer.byteLength) {
      return NextResponse.json({ error: "Please upload an audio file" }, { status: 400 });
    }

    const contentType = request.headers.get("content-type") || "audio/wav";
    const voice = await prisma.voice.create({
      data: {
        userId: session.user.id,
        name,
        variant: VoiceVariant.CUSTOM,
        description,
        category,
        language,
      },
    });

    const r2ObjectKey = `voices/users/${session.user.id}/${voice.id}.wav`;

    await uploadAudio({
      buffer: Buffer.from(fileBuffer),
      key: r2ObjectKey,
      contentType,
    });

    await prisma.voice.update({
      where: { id: voice.id },
      data: { r2ObjectKey },
    });

    return NextResponse.json({ id: voice.id, name, message: "Voice created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Voice creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
