CREATE TABLE `discussion_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`author_id` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`category` text DEFAULT 'general' NOT NULL,
	`reply_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `discussion_posts_category_idx` ON `discussion_posts` (`category`);--> statement-breakpoint
CREATE INDEX `discussion_posts_author_idx` ON `discussion_posts` (`author_id`);--> statement-breakpoint
CREATE INDEX `discussion_posts_created_idx` ON `discussion_posts` (`created_at`);--> statement-breakpoint
CREATE TABLE `discussion_replies` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`author_id` text NOT NULL,
	`body` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `discussion_posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`author_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `discussion_replies_post_idx` ON `discussion_replies` (`post_id`);--> statement-breakpoint
CREATE INDEX `discussion_replies_author_idx` ON `discussion_replies` (`author_id`);