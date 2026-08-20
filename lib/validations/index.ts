import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username too long")
    .regex(/^[a-zA-Z0-9_.]+$/, "Username can only contain letters, numbers, underscores and dots"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const CreatePostSchema = z.object({
  content: z.string().optional().default(""),
  privacy: z.enum(["PUBLIC", "FRIENDS", "ONLY_ME"]).default("PUBLIC"),
  feeling: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  bgTheme: z.string().optional().nullable(),
  groupId: z.string().optional().nullable(),
  images: z.array(z.string()).optional().default([]),
});

export const CreateCommentSchema = z.object({
  postId: z.string().min(1),
  parentId: z.string().optional().nullable(),
  content: z.string().min(1, "Comment cannot be empty"),
  image: z.string().optional().nullable(),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(250).optional().nullable(),
  headline: z.string().max(100).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  website: z.string().max(100).optional().nullable(),
  work: z.string().max(100).optional().nullable(),
  education: z.string().max(100).optional().nullable(),
  relationship: z.string().max(50).optional().nullable(),
});

export const CreateGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters").max(60),
  description: z.string().max(500).optional(),
  privacy: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),
  coverPhoto: z.string().optional().nullable(),
});

export const SendMessageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().min(1, "Message cannot be empty"),
  mediaUrl: z.string().optional().nullable(),
});
