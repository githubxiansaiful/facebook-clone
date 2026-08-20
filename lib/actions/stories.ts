"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

export async function createStoryAction(data: {
  mediaType: "IMAGE" | "TEXT";
  mediaUrl?: string | null;
  textContent?: string | null;
  bgGradient?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  // Expires in 24 hours
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const story = await prisma.story.create({
    data: {
      userId: currentUser.id,
      mediaType: data.mediaType,
      mediaUrl: data.mediaUrl || null,
      textContent: data.textContent || null,
      bgGradient: data.bgGradient || "from-blue-600 via-indigo-600 to-purple-600",
      expiresAt,
    },
  });

  revalidatePath("/");
  return { success: true, story };
}

export async function deleteStoryAction(storyId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.story.deleteMany({
    where: {
      id: storyId,
      userId: currentUser.id,
    },
  });

  revalidatePath("/");
  return { success: true };
}
