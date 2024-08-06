"use server";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { editProfileSchema } from "../validations/editProfileSchema";

type FormState = {
  errorMessage: string;
  successMessage: string;
};

export async function editProfileAction(data: FormData): Promise<FormState> {
  const session: {user: {id: string}} | null = await getServerSession(authOptions);
  
  
  if (!session || !session.user || !session.user.id) {
    return {
      errorMessage: "User not authenticated",
      successMessage: "",
    };
  }
  
  const formData = {
    username: data.get('username') as string,
    name: data.get('name') as string,
    bio: data.get('bio') as string,
    avatar: data.get('avatar') as string | null,
  };

  const parsed = editProfileSchema.safeParse(formData);

  console.log(parsed)
  if(!parsed.success){
    return {
      errorMessage: "Error during edit profile",
      successMessage: "",
    };
  }

  try {
      const existingUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, parsed.data.username))
      .limit(1)

      const currentUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.user.id))
      .limit(1)


      if (
        existingUsername.length > 0 &&
        parsed.data.username !== currentUsername[0].username
      ) {
        return {
          errorMessage: "Username already exists",
          successMessage: "",
        };
      }

    await db
      .update(usersTable)
      .set({
        username: parsed.data.username,
        name: parsed.data.name,
        bio: parsed.data.bio,
        // avatar: parsed.data.avatar
      })
      .where(eq(usersTable.id, session.user.id));


      revalidatePath("/profile")
      
    return {
      errorMessage: "",
      successMessage: "Profile edited successfully",
    };

  } catch (err: any) {
    return {
      errorMessage: "Error: " + err.message,
      successMessage: "",
    };
  }
}
