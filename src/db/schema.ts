import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { integer, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id").notNull().primaryKey().default(uuidv4()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  avatar: text("avatar").notNull().default(""),
});

// export type UserSelect = typeof usersTable.$inferSelect;
// export type UserInsert = typeof usersTable.$inferInsert;
