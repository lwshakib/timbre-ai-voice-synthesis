import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPresignedDownloadUrl } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || session.user.image;

  if (!key) {
    return NextResponse.json({ signedUrl: null });
  }

  // If the key starts with http, it's a social avatar
  if (key.startsWith("http")) {
    return NextResponse.json({ signedUrl: key });
  }

  try {
    const signedUrl = await getPresignedDownloadUrl(key);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("S3 Signed URL Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
