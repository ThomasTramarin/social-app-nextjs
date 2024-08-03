"use server";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type FormState = {
  errorMessage: string;
  successMessage: string;
};

export async function editProfileAction(prevState: FormState, data: FormData) {
  const session: {user: {id: string}} | null = await getServerSession(authOptions);
  

  if (!session || !session.user || !session.user.id) {
    return {
      ...prevState,
      errorMessage: "User not authenticated",
      successMessage: "",
    };
  }

  const formData = {
    username: data.get("username") as string,
    name: data.get("name") as string,
    bio: data.get("bio") as string,
  };

  try {
      const existingUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, formData.username))
      .limit(1)

      const currentUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.user.id))
      .limit(1)


      if (
        existingUsername.length > 0 &&
        formData.username !== currentUsername[0].username
      ) {
        return {
          ...prevState,
          errorMessage: "Username already exists",
          successMessage: "",
        };
      }

    await db
      .update(usersTable)
      .set({
        username: formData.username,
        name: formData.name,
        bio: formData.bio,
      })
      .where(eq(usersTable.id, session.user.id));

      revalidatePath("/profile")
    return {
      ...prevState,
      errorMessage: "",
      successMessage: "Profile edited successfully",
    };

  } catch (err: any) {
    return {
      ...prevState,
      errorMessage: "Error: " + err.message,
      successMessage: "",
    };
  }
}
