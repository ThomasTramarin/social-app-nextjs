"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { registerFormSchema } from "../validations/registerFormSchema";


type FormState = {
  errorMessage: string;
  successMessage: string;
};

export default async function registerAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  
  const formData = Object.fromEntries(data);
  const parsed = registerFormSchema.safeParse(formData);

  if(!parsed.success){
    return {
      errorMessage: "Error during registration",
      successMessage: "",
    };
  }

  try {
    const existingUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, parsed.data.username));

    const existingEmail = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, parsed.data.email));

    if (existingUsername.length > 0) {
      return {
        errorMessage: "Username already exists",
        successMessage: "",
      };
    }

    if (existingEmail.length > 0) {
      return {
        errorMessage: "Email already exists",
        successMessage: "",
      };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    
    const res = await db.insert(usersTable).values({
      email: parsed.data.email,
      username: parsed.data.username,
      name: parsed.data.username,
      bio: "",
      password: hashedPassword,
    })

    return {
      errorMessage: "",
      successMessage: "User created successfully",
    };


  } catch (err: any) {
    return {
      errorMessage: "Error: " + err.message,
      successMessage: "",
    };
  }
}
