"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { UpdateProfileSchema } from "../validations";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(data: {
  name: string;
  bio?: string | null;
  headline?: string | null;
  location?: string | null;
  website?: string | null;
  work?: string | null;
  education?: string | null;
  relationship?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const validation = UpdateProfileSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  const updated = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name: validation.data.name,
      bio: validation.data.bio || null,
      headline: validation.data.headline || null,
      location: validation.data.location || null,
      website: validation.data.website || null,
      work: validation.data.work || null,
      education: validation.data.education || null,
      relationship: validation.data.relationship || null,
    },
  });

  revalidatePath(`/profile/${currentUser.username}`);
  revalidatePath("/settings");
  return { success: true, user: updated };
}

export async function updateAvatarAction(avatarUrl: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { avatar: avatarUrl },
  });

  revalidatePath(`/profile/${currentUser.username}`);
  revalidatePath("/");
  return { success: true };
}

export async function updateCoverPhotoAction(coverUrl: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { coverPhoto: coverUrl },
  });

  revalidatePath(`/profile/${currentUser.username}`);
  return { success: true };
}
