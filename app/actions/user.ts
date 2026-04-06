"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPresignedUploadUrl } from "@/lib/s3";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProfileUploadUrl(contentType: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const fileExtension = contentType.split("/")[1] || "png";
  const key = `avatars/${session.user.id}-${Date.now()}.${fileExtension}`;

  const uploadUrl = await getPresignedUploadUrl({
    key,
    contentType,
  });

  return { uploadUrl, key };
}

export async function updateProfileImage(key: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Update the user image in the database
  // Note: We're storing the S3 key. We'll need a way to resolve this to a URL.
  // For now, we'll store the key and the frontend can use getPresignedDownloadUrl if needed,
  // or we can store a public URL if the bucket is public.
  // The user requested: "when we need to read the file using the path it has to check a signed url and using it it can read"
  
  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: key },
  });

  revalidatePath("/settings");
  return { success: true };
}

export async function getProfileImage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.image) return null;

  // If the image starts with http, it's a social avatar
  if (session.user.image.startsWith("http")) {
    return session.user.image;
  }

  // Otherwise, it's an S3 key, get a signed URL
  try {
    const { getPresignedDownloadUrl } = await import("@/lib/s3");
    return await getPresignedDownloadUrl(session.user.image);
  } catch (error) {
    console.error("Error signing avatar URL:", error);
    return null;
  }
}
