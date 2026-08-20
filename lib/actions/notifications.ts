"use server";

import { prisma } from "../db";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

export async function markNotificationReadAction(notificationId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.notification.updateMany({
    where: {
      id: notificationId,
      recipientId: currentUser.id,
    },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
  return { success: true };
}

export async function markAllNotificationsReadAction() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  await prisma.notification.updateMany({
    where: {
      recipientId: currentUser.id,
      isRead: false,
    },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
  return { success: true };
}
