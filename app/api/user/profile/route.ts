import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { imageKey } = await request.json();

    if (!imageKey) {
      return new NextResponse('Missing imageKey', { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageKey },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User Profile Update Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
