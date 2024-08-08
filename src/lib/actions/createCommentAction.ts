"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { db } from "@/db";
import { commentsTable } from "@/db/schema";
import { revalidateTag } from "next/cache";

type Props = { text: string; postId: string };

export default async function createCommentAction({ text, postId }: Props) {
  const session: { user: { id: string } } | null = await getServerSession(
    authOptions
  );
  const userId = session?.user.id;

  if (!userId ||!postId) {
    throw new Error("User not authenticated or post ID is undefined");
  }

  try{
    await db.insert(commentsTable).values({ text, post_id: postId, author_id: userId, });

    revalidateTag("user-profile-info")
  }catch(err: any){
    throw new Error("Error " + err);
  }
}
