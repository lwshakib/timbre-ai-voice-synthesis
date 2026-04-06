import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { uploadAudio, getSignedAudioUrl } from "@/lib/s3";

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
    const activeOrgId = session.session.activeOrganizationId;

    const generations = await prisma.generation.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { 
            organizationId: activeOrgId || undefined 
          }
        ],
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
        organizationId: true,
        path: true,
      },
    });

    const generationsWithUrls = await Promise.all(
      generations.map(async (g) => ({
        ...g,
        url: g.path ? await getSignedAudioUrl(g.path) : null,
      }))
    );

    return NextResponse.json(generationsWithUrls);
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
        path: true,
      },
    });

    if (!voice || !voice.path) {
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
        voice_key: voice.path,
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

    const activeOrgId = session.session.activeOrganizationId;

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        organizationId: activeOrgId,
        text,
        voiceName: voice.name,
        voiceId: voice.id,
        temperature,
        topP,
        topK,
        repetitionPenalty,
      },
    });

    const path = activeOrgId
      ? `generations/orgs/${activeOrgId}/${generation.id}.wav`
      : `generations/users/${session.user.id}/${generation.id}.wav`;

    await uploadAudio({ buffer, key: path });

    await prisma.generation.update({
      where: { id: generation.id },
      data: { path },
    });

    const url = await getSignedAudioUrl(path);

    return NextResponse.json({ id: generation.id, url });
  } catch (error) {
    console.error("TTS generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

