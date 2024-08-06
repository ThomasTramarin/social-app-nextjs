"use server";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { createPostSchema } from "../validations/createPostSchema";

type FormState = {
  errorMessage: string;
  successMessage: string;
};

export async function createPostAction(data: FormData): Promise<FormState> {
  const session: { user: { id: string } } | null = await getServerSession(
    authOptions
  );

  if (!session || !session.user || !session.user.id) {
    return {
      errorMessage: "User not authenticated",
      successMessage: "",
    };
  }

  try {
    const formData = {
      content: data.get("content") as string,
      image: data.get("image") as string,
      allowComments: data.get("allowComments") === "true",
      visibility: data.get("visibility") as string,
    };

    const parsed = createPostSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        errorMessage: "Error during post creation",
        successMessage: "",
      };
    }

    const res = await db
      .insert(postsTable)
      .values({
        author_id: session.user.id,
        text: parsed.data.content,
        image_url: parsed.data.image || "",
        allow_comments: parsed.data.allowComments,
        visibility: parsed.data.visibility,
      });

    return {
      errorMessage: "",
      successMessage: "Post created successfully",
    };
  } catch (err: any) {
    return {
      errorMessage: "Error: " + err.message,
      successMessage: "",
    };
  }
}
