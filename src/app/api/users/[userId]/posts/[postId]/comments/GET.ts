import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string; postId: string } }
) {
  const res = await prisma.comment.findMany({
    where: {
      postId: parseInt(params.postId),
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      postId: true,
      user: {
        select: {
          id: true,
          name: true,
          profilePhoto: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  return NextResponse.json({ comments: res });
}