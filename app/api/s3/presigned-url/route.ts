import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getPresignedUploadUrl } from '@/lib/s3';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get('contentType');

  if (!contentType) {
    return new NextResponse('Missing contentType', { status: 400 });
  }

  const fileExtension = contentType.split('/')[1] || 'png';
  const key = `avatars/${session.user.id}-${Date.now()}.${fileExtension}`;

  try {
    const uploadUrl = await getPresignedUploadUrl({
      key,
      contentType,
    });

    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error('S3 Presigned URL Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
