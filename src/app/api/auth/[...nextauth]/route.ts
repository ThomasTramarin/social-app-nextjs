import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

          if (!users || users.length === 0) {
            throw new Error("User not found");
          }

          const user = users[0];

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return { id: user.id };
          } else {
            throw new Error("Invalid credentials");
          }

        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // Add user id to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add the user id to the session
      return {
        ...session,
        user: {
          id: token.id
        }
      }
    },
  },
  pages: {
    signIn: "login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
