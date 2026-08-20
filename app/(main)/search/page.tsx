import React from "react";
import { getCurrentUser } from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import { SearchResultsView } from "../../../components/search/SearchResultsView";
import { PostItemType } from "../../../types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const query = q.trim();

  let users: any[] = [];
  let groups: any[] = [];
  let posts: any[] = [];

  if (query) {
    [users, groups, posts] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { username: { contains: query } },
            { bio: { contains: query } },
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
        take: 20,
      }),
      prisma.group.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
          ],
        },
        include: {
          _count: { select: { members: true, posts: true } },
        },
        take: 10,
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
              isOnline: true,
            },
          },
          images: true,
          reactions: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatar: true,
                },
              },
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatar: true,
                },
              },
              reactions: true,
              replies: true,
            },
          },
          _count: {
            select: { comments: true, reactions: true, savedBy: true },
          },
        },
        take: 20,
      }),
    ]);
  }

  return (
    <SearchResultsView
      query={query}
      users={users}
      groups={groups}
      posts={posts as unknown as PostItemType[]}
      currentUser={currentUser}
    />
  );
}
