import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const generation = await prisma.generation.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        id: true,
        text: true,
        voiceName: true,
        voiceId: true,
        temperature: true,
        topP: true,
        topK: true,
        repetitionPenalty: true,
        createdAt: true,
      },
    });

    if (!generation) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }

    // Include the audio URL directly for the detail view
    const data = {
      ...generation,
      audioUrl: `/api/audio/${generation.id}`,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch generation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
