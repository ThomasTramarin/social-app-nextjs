"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { db } from "@/db";
import { likesTable } from "@/db/schema";
import { revalidateTag } from "next/cache";
import { and, eq } from "drizzle-orm";

export default async function postlikeAction(postId: string | undefined, addLike: boolean){
    const session: {user: {id: string}} | null = await getServerSession(authOptions);

    if(!session ||!session.user ||!session.user.id){
        throw new Error("User not authenticated");
    }

    if (!postId) {
        throw new Error("Post ID is undefined");
    }

    try{ 
        if(addLike){
            await db.insert(likesTable).values({post_id: postId, user_id: session.user.id})
        }else{
            await db.delete(likesTable).where(and(eq(likesTable.post_id, postId), eq(likesTable.user_id, session.user.id)));
        }
        

        revalidateTag("user-profile-info");
    }catch (err: any) {
        throw new Error("Error " + err);
    }
}