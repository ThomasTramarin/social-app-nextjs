import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id").notNull().primaryKey().default(uuidv4()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  avatar: text("avatar").notNull().default(""),
});

export const postsTable = sqliteTable("posts", {
  post_id: text("post_id").notNull().primaryKey().default(uuidv4()),
  author_id: text("author_id").notNull().references(()=> usersTable.id),
  creation_date: text("creation_date").notNull().default(sql`CURRENT_TIMESTAMP`),
  hashtags: text('hashtags'),
  text: text('text'),
  image_url: text('image_url'),
})

export const commentsTable = sqliteTable("comments", {
  comment_id: text("comment_id").notNull().primaryKey().default(uuidv4()),
  post_id: text("post_id").notNull().references(()=> postsTable.post_id),
  author_id: integer('author_id').references(() => usersTable.id).notNull(),
  creation_date: text('creation_date').default(sql`CURRENT_TIMESTAMP`),
  text: text('text').notNull(),
})

export const followersTable = sqliteTable("followers", {
  id: text("id").notNull().primaryKey().default(uuidv4()),
  follower_id: text("follower_id").notNull().references(() => usersTable.id), 
  followed_user_id: text("followed_user_id").notNull().references(() => usersTable.id),
})

export const likesTable = sqliteTable("likes", {
  id: text("id").notNull().primaryKey().default(uuidv4()),
  post_id: text("post_id").notNull().references(() => postsTable.post_id),
  user_id: text("user_id").notNull().references(() => usersTable.id),
});

// export type UserSelect = typeof usersTable.$inferSelect;
// export type UserInsert = typeof usersTable.$inferInsert;
