import { db } from "@/db";
import { commentsTable, likesTable, postsTable, repostTable, usersTable } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const sessionHeader = req.headers.get("session");

  if (sessionHeader === null || sessionHeader.trim() === "") {
    return NextResponse.json(
      { message: "No session header provided" },
      { status: 400 }
    );
  }

  try {
    const sessionObj = JSON.parse(sessionHeader);
    const userId = sessionObj.user.id;

    const userInfo = await db.select().from(usersTable).where(eq(usersTable.id, userId));

    const userPosts = await db
      .select({
        post_id: postsTable.post_id,
        author_id: postsTable.author_id,
        creation_date: postsTable.creation_date,
        text: postsTable.text,
        image_url: postsTable.image_url,
        likes: sql<number>`COUNT(DISTINCT ${likesTable.id})`.as('likes_count'),
        comments_count: sql<number>`COUNT(DISTINCT ${commentsTable.comment_id})`.as('comments_count'),
        reposts: sql<number>`COUNT(DISTINCT ${repostTable.repost_id})`.as('reposts_count'),
        userHasLiked: sql`EXISTS(SELECT 1 FROM ${likesTable} WHERE ${likesTable.post_id} = ${postsTable.post_id} AND ${likesTable.user_id} = ${userId})`.as("userHasLiked"),
      })
      .from(postsTable)
      .leftJoin(likesTable, eq(postsTable.post_id, likesTable.post_id))
      .leftJoin(commentsTable, eq(postsTable.post_id, commentsTable.post_id))
      .leftJoin(repostTable, eq(postsTable.post_id, repostTable.post_id))
      .where(eq(postsTable.author_id, userId))
      .groupBy(
        postsTable.post_id,
        postsTable.author_id,
        postsTable.creation_date,
        postsTable.text,
        postsTable.image_url
      )
      .orderBy(sql`datetime(${postsTable.creation_date}) DESC`);

    const postsWithComments = await Promise.all(userPosts.map(async (post) => {
      const comments = await db
        .select({
          comment_id: commentsTable.comment_id,
          author_id: commentsTable.author_id,
          author_name: usersTable.name,       
          author_avatar: usersTable.avatar,
          creation_date: commentsTable.creation_date,
          text: commentsTable.text,
        })
        .from(commentsTable)
        .leftJoin(usersTable, eq(commentsTable.author_id, usersTable.id))
        .where(eq(commentsTable.post_id, post.post_id));

      return { ...post, comments };
    }));

    return NextResponse.json({ ...userInfo[0], posts: postsWithComments });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}