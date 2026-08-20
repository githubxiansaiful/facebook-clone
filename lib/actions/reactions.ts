"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { ReactionType } from "../utils";
import { revalidatePath } from "next/cache";

export async function toggleReactionAction(params: {
  targetType: "post" | "comment";
  targetId: string;
  reactionType: ReactionType;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Must be logged in" };
  }

  const { targetType, targetId, reactionType } = params;

  if (targetType === "post") {
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        userId: currentUser.id,
        postId: targetId,
      },
    });

    if (existingReaction) {
      if (existingReaction.type === reactionType) {
        // Remove reaction
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
        revalidatePath("/");
        return { success: true, action: "removed", reaction: null };
      } else {
        // Change reaction
        const updated = await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { type: reactionType },
        });
        revalidatePath("/");
        return { success: true, action: "updated", reaction: updated.type };
      }
    } else {
      // Create reaction
      const created = await prisma.reaction.create({
        data: {
          type: reactionType,
          userId: currentUser.id,
          postId: targetId,
        },
      });

      // Send notification if not reacting to own post
      const post = await prisma.post.findUnique({
        where: { id: targetId },
        select: { authorId: true },
      });

      if (post && post.authorId !== currentUser.id) {
        await prisma.notification.create({
          data: {
            recipientId: post.authorId,
            issuerId: currentUser.id,
            type: "POST_LIKE",
            entityId: targetId,
            message: `reacted to your post.`,
            link: `/#post-${targetId}`,
          },
        });
      }

      revalidatePath("/");
      return { success: true, action: "created", reaction: created.type };
    }
  } else {
    // Target is comment
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        userId: currentUser.id,
        commentId: targetId,
      },
    });

    if (existingReaction) {
      if (existingReaction.type === reactionType) {
        await prisma.reaction.delete({
          where: { id: existingReaction.id },
        });
        revalidatePath("/");
        return { success: true, action: "removed", reaction: null };
      } else {
        const updated = await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { type: reactionType },
        });
        revalidatePath("/");
        return { success: true, action: "updated", reaction: updated.type };
      }
    } else {
      const created = await prisma.reaction.create({
        data: {
          type: reactionType,
          userId: currentUser.id,
          commentId: targetId,
        },
      });

      const comment = await prisma.comment.findUnique({
        where: { id: targetId },
        select: { authorId: true, postId: true },
      });

      if (comment && comment.authorId !== currentUser.id) {
        await prisma.notification.create({
          data: {
            recipientId: comment.authorId,
            issuerId: currentUser.id,
            type: "POST_LIKE",
            entityId: comment.postId,
            message: `liked your comment.`,
            link: `/#post-${comment.postId}`,
          },
        });
      }

      revalidatePath("/");
      return { success: true, action: "created", reaction: created.type };
    }
  }
}
