import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { uploadAudio } from "@/lib/s3";

const CHATTERBOX_API_URL = process.env.CHATTERBOX_API_URL;
const CHATTERBOX_API_KEY = process.env.CHATTERBOX_API_KEY;

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

  try {
    const generations = await prisma.generation.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        text: true,
        voiceName: true,
        voiceId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(generations);
  } catch (error) {
    console.error("Failed to fetch generations:", error);
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
    const body = await request.json();
    const {
      text,
      voiceId,
      temperature = 0.8,
      topP = 0.95,
      topK = 1000,
      repetitionPenalty = 1.2,
    } = body;

    if (!text || !voiceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const voice = await prisma.voice.findUnique({
      where: {
        id: voiceId,
      },
      select: {
        id: true,
        name: true,
        r2ObjectKey: true,
      },
    });

    if (!voice || !voice.r2ObjectKey) {
      return NextResponse.json({ error: "Voice not found or invalid" }, { status: 404 });
    }

    const response = await fetch(`${CHATTERBOX_API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CHATTERBOX_API_KEY!,
      },
      body: JSON.stringify({
        prompt: text,
        voice_key: voice.r2ObjectKey,
        temperature,
        top_p: topP,
        top_k: topK,
        repetition_penalty: repetitionPenalty,
        norm_loudness: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Chatterbox API error:", errorData);
      return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(audioArrayBuffer);

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        text,
        voiceName: voice.name,
        voiceId: voice.id,
        temperature,
        topP,
        topK,
        repetitionPenalty,
      },
    });

    const r2ObjectKey = `generations/users/${session.user.id}/${generation.id}.wav`;

    await uploadAudio({ buffer, key: r2ObjectKey });

    await prisma.generation.update({
      where: { id: generation.id },
      data: { r2ObjectKey },
    });

    return NextResponse.json({ id: generation.id });
  } catch (error) {
    console.error("TTS generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
