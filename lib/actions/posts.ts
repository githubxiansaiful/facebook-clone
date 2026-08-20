"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

export async function createPostAction(data: {
  content: string;
  privacy?: "PUBLIC" | "FRIENDS" | "ONLY_ME";
  feeling?: string | null;
  location?: string | null;
  bgTheme?: string | null;
  groupId?: string | null;
  images?: string[];
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be signed in to create a post." };
  }

  if (!data.content?.trim() && (!data.images || data.images.length === 0)) {
    return { error: "Please write some text or attach an image." };
  }

  const newPost = await prisma.post.create({
    data: {
      authorId: currentUser.id,
      content: data.content || "",
      privacy: data.privacy || "PUBLIC",
      feeling: data.feeling || null,
      location: data.location || null,
      bgTheme: data.bgTheme || null,
      groupId: data.groupId || null,
      images: data.images && data.images.length > 0
        ? {
            create: data.images.map((url, index) => ({
              url,
              order: index,
            })),
          }
        : undefined,
    },
  });

  revalidatePath("/");
  if (data.groupId) {
    revalidatePath(`/groups/${data.groupId}`);
  }
  revalidatePath(`/profile/${currentUser.username}`);

  return { success: true, post: newPost };
}

export async function deletePostAction(postId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Unauthorized" };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true, groupId: true },
  });

  if (!post) {
    return { error: "Post not found." };
  }

  if (post.authorId !== currentUser.id) {
    return { error: "You are not authorized to delete this post." };
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/");
  revalidatePath(`/profile/${currentUser.username}`);
  if (post.groupId) {
    revalidatePath(`/groups/${post.groupId}`);
  }

  return { success: true };
}

export async function toggleSavePostAction(postId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Unauthorized" };
  }

  const existingSave = await prisma.savedPost.findUnique({
    where: {
      userId_postId: {
        userId: currentUser.id,
        postId,
      },
    },
  });

  if (existingSave) {
    await prisma.savedPost.delete({
      where: {
        id: existingSave.id,
      },
    });
    revalidatePath("/saved");
    revalidatePath("/");
    return { success: true, saved: false };
  } else {
    await prisma.savedPost.create({
      data: {
        userId: currentUser.id,
        postId,
      },
    });
    revalidatePath("/saved");
    revalidatePath("/");
    return { success: true, saved: true };
  }
}
