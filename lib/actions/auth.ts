"use server";

import { prisma } from "../db";
import { hashPassword, verifyPassword, setAuthCookie, clearAuthCookie, getCurrentUser } from "../auth";
import { RegisterSchema, LoginSchema } from "../validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    username: (formData.get("username") as string)?.toLowerCase().trim(),
    email: (formData.get("email") as string)?.toLowerCase().trim(),
    password: formData.get("password") as string,
  };

  const validation = RegisterSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || "Invalid input",
    };
  }

  const { name, username, email, password } = validation.data;

  // Check if username or email exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return { error: "An account with this email already exists." };
    }
    return { error: "Username is already taken. Please choose another." };
  }

  const passwordHash = await hashPassword(password);

  // Generate nice avatar fallback URL
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash,
      avatar: avatarUrl,
      headline: "New Facebook user",
      isOnline: true,
    },
  });

  await setAuthCookie({
    userId: newUser.id,
    email: newUser.email,
    username: newUser.username,
    name: newUser.name,
    avatar: newUser.avatar,
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function loginAction(formData: FormData) {
  const rawData = {
    emailOrUsername: (formData.get("emailOrUsername") as string)?.trim(),
    password: formData.get("password") as string,
  };

  const validation = LoginSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid credentials" };
  }

  const { emailOrUsername, password } = validation.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    },
  });

  if (!user) {
    return { error: "Invalid email/username or password." };
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash);
  if (!isValidPassword) {
    return { error: "Invalid email/username or password." };
  }

  // Update online status
  await prisma.user.update({
    where: { id: user.id },
    data: { isOnline: true, lastSeen: new Date() },
  });

  await setAuthCookie({
    userId: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function logoutAction() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { isOnline: false, lastSeen: new Date() },
    });
  }
  await clearAuthCookie();
  redirect("/login");
}

export async function forgotPasswordAction(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    return {
      success: true,
      message: "If an account exists with this email, password reset instructions have been sent.",
    };
  }

  return {
    success: true,
    message: "A password reset link has been dispatched to your email address.",
  };
}

export async function demoLoginAction(targetUsername: string = "mark") {
  const user = await prisma.user.findUnique({
    where: { username: targetUsername },
  });

  if (!user) {
    return { error: "Demo user not found. Please run seed." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isOnline: true, lastSeen: new Date() },
  });

  await setAuthCookie({
    userId: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
  });

  revalidatePath("/", "layout");
  return { success: true };
}
