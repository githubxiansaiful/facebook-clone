"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { CreateCommentSchema } from "../validations";
import { revalidatePath } from "next/cache";

export async function createCommentAction(formData: {
  postId: string;
  parentId?: string | null;
  content: string;
  image?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Must be logged in to comment" };
  }

  const validation = CreateCommentSchema.safeParse(formData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid comment" };
  }

  const { postId, parentId, content, image } = validation.data;

  const newComment = await prisma.comment.create({
    data: {
      postId,
      parentId: parentId || null,
      authorId: currentUser.id,
      content,
      image: image || null,
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
  });

  // Fetch post owner to notify
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (post && post.authorId !== currentUser.id) {
    await prisma.notification.create({
      data: {
        recipientId: post.authorId,
        issuerId: currentUser.id,
        type: parentId ? "COMMENT_REPLY" : "POST_COMMENT",
        entityId: postId,
        message: parentId
          ? `replied to a comment on your post.`
          : `commented on your post.`,
        link: `/#post-${postId}`,
      },
    });
  }

  revalidatePath("/");
  return { success: true, comment: newComment };
}

export async function deleteCommentAction(commentId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Unauthorized" };
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true, postId: true },
  });

  if (!comment) {
    return { error: "Comment not found" };
  }

  if (comment.authorId !== currentUser.id) {
    return { error: "You are not authorized to delete this comment." };
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  revalidatePath("/");
  return { success: true };
}
