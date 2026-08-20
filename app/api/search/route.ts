import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ users: [], groups: [], posts: [] });
  }

  const query = q.trim();

  const [users, groups, posts] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { username: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        headline: true,
        isOnline: true,
      },
      take: 5,
    }),
    prisma.group.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        coverPhoto: true,
        _count: {
          select: { members: true },
        },
      },
      take: 4,
    }),
    prisma.post.findMany({
      where: {
        content: { contains: query },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
      take: 5,
    }),
  ]);

  return NextResponse.json({ users, groups, posts });
}
