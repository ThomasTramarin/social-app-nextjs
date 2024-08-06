import * as z from "zod";

export const createPostSchema = z.object({
    content: z.string().max(1000).min(10),
    image: z.any().optional(),
    allowComments: z.boolean(),
    visibility: z.string(),
  })