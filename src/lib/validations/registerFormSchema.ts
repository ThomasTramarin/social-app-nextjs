import * as z from "zod";

export const registerFormSchema = z.object({
    username: z.string().min(3).max(16).regex(/^[a-zA-Z0-9._]+$/, "Username can only contain letters, numbers, dots, and underscores"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  }).refine((data) => {
      return data.password === data.confirmPassword
  }, {
      message: "Password do not match",
      path: ["confirmPassword"],
  })