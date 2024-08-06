import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
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
    const userInfo = await db.select().from(usersTable).where(eq(usersTable.id, sessionObj.user.id))

    return NextResponse.json({...userInfo[0]})

  } catch (error: any) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }
}
