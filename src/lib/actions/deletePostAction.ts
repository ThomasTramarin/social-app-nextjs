"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function deletePostAction(postId: string | undefined) {
  const session: { user: { id: string } } | null = await getServerSession(
    authOptions
  );
  const userId = session?.user?.id;

  try {
    if (userId && postId) {
      await db
        .delete(postsTable)
        .where(
          and(eq(postsTable.post_id, postId), eq(postsTable.author_id, userId))
        );
    }

    revalidateTag("user-profile-info");

    return {
      errorMessage: "",
      successMessage: "Post deleted successfully",
    };
  } catch (err: any) {
    return {
      errorMessage: "Error: " + err.message,
      successMessage: "",
    };
  }
}
