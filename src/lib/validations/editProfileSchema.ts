import * as z from "zod";

export const editProfileSchema = z.object({
    username: z.string().min(3).max(16).regex(/^[a-zA-Z0-9._]+$/, "Username can only contain letters, numbers, dots, and underscores"),
    name: z.string().max(30).min(1),
    bio: z.string().max(300),
  })