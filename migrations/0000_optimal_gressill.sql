CREATE TABLE `comments` (
	`comment_id` text PRIMARY KEY DEFAULT 'f6547c0d-6584-4cc0-ba23-b75cd312623c' NOT NULL,
	`post_id` text NOT NULL,
	`author_id` integer NOT NULL,
	`creation_date` text DEFAULT CURRENT_TIMESTAMP,
	`text` text NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `followers` (
	`id` text PRIMARY KEY DEFAULT '01ee22dc-6a59-44c0-9dd0-9928a7728c06' NOT NULL,
	`follower_id` text NOT NULL,
	`followed_user_id` text NOT NULL,
	FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`followed_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` text PRIMARY KEY DEFAULT '9687858d-ace2-402e-85da-392a25986948' NOT NULL,
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`post_id` text PRIMARY KEY DEFAULT '3f164792-e49e-4455-b2b2-57e9a29991c7' NOT NULL,
	`author_id` text NOT NULL,
	`creation_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`hashtags` text,
	`text` text,
	`image_url` text,
	`allow_comments` integer NOT NULL,
	`visibility` text DEFAULT 'public' NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reposts` (
	`repost_id` text PRIMARY KEY DEFAULT '9a80d820-4289-4374-bbc2-9f032cd32795' NOT NULL,
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	`creation_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT 'ad759b21-6ce4-4cbe-b76b-6692fe8eac71' NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`bio` text NOT NULL,
	`avatar` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);