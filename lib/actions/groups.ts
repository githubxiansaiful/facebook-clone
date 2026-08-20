"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { CreateGroupSchema } from "../validations";
import { revalidatePath } from "next/cache";

export async function createGroupAction(formData: {
  name: string;
  description?: string;
  privacy?: "PUBLIC" | "PRIVATE";
  coverPhoto?: string | null;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const validation = CreateGroupSchema.safeParse(formData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid group details" };
  }

  const { name, description, privacy, coverPhoto } = validation.data;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") + "-" + Math.random().toString(36).substring(2, 6);

  const group = await prisma.group.create({
    data: {
      name,
      slug,
      description: description || null,
      privacy: privacy || "PUBLIC",
      coverPhoto: coverPhoto || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      createdById: currentUser.id,
      members: {
        create: {
          userId: currentUser.id,
          role: "ADMIN",
        },
      },
    },
  });

  revalidatePath("/groups");
  return { success: true, group };
}

export async function joinGroupAction(groupId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  const existing = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId,
        userId: currentUser.id,
      },
    },
  });

  if (existing) return { error: "Already a member" };

  await prisma.groupMember.create({
    data: {
      groupId,
      userId: currentUser.id,
      role: "MEMBER",
    },
  });

  revalidatePath(`/groups/${groupId}`);
  revalidatePath("/groups");
  return { success: true };
}

export async function leaveGroupAction(groupId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.groupMember.deleteMany({
    where: {
      groupId,
      userId: currentUser.id,
    },
  });

  revalidatePath(`/groups/${groupId}`);
  revalidatePath("/groups");
  return { success: true };
}
