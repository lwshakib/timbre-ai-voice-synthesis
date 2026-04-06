import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { getSignedAudioUrl } from "@/lib/s3";

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
    });

    if (!generation || !generation.r2ObjectKey) {
      return NextResponse.json({ error: "Audio not found" }, { status: 404 });
    }

    const signedUrl = await getSignedAudioUrl(generation.r2ObjectKey);
    const audioResponse = await fetch(signedUrl);

    if (!audioResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch audio" }, { status: 502 });
    }

    return new Response(audioResponse.body, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Failed to fetch audio:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
