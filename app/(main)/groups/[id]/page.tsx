import React from "react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "../../../../lib/auth";
import { getGroupDetails, getFeedPosts } from "../../../../lib/data";
import { GroupDetailsView } from "../../../../components/groups/GroupDetailsView";
import { PostItemType } from "../../../../types";

interface GroupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const group = await getGroupDetails(id);
  if (!group) {
    notFound();
  }

  // Fetch posts in this group
  const posts = await getFeedPosts("all", group.id);

  return (
    <GroupDetailsView
      group={group}
      posts={posts}
      currentUser={currentUser}
    />
  );
}
