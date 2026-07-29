CREATE TABLE `item_nodes` (
	`item_id` text NOT NULL,
	`node_id` text NOT NULL,
	PRIMARY KEY(`item_id`, `node_id`),
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `item_nodes_node_idx` ON `item_nodes` (`node_id`);--> statement-breakpoint
CREATE TABLE `item_statistics` (
	`item_version_id` text PRIMARY KEY NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`correct` integer DEFAULT 0 NOT NULL,
	`p_value` real,
	`discrimination` real,
	`abandonments` integer DEFAULT 0 NOT NULL,
	`reports` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`item_version_id`) REFERENCES `item_versions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`version` integer NOT NULL,
	`payload` text NOT NULL,
	`provenance_id` text NOT NULL,
	`published_at` integer,
	`retired_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`provenance_id`) REFERENCES `provenance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `item_versions_item_idx` ON `item_versions` (`item_id`);--> statement-breakpoint
CREATE TABLE `items` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`level` text NOT NULL,
	`skill` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`lesson_id` text,
	`current_version_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `items_status_idx` ON `items` (`status`);--> statement-breakpoint
CREATE INDEX `items_level_idx` ON `items` (`level`);--> statement-breakpoint
CREATE INDEX `items_lesson_idx` ON `items` (`lesson_id`);--> statement-breakpoint
CREATE TABLE `lesson_nodes` (
	`lesson_id` text NOT NULL,
	`node_id` text NOT NULL,
	PRIMARY KEY(`lesson_id`, `node_id`),
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `lesson_nodes_node_idx` ON `lesson_nodes` (`node_id`);--> statement-breakpoint
CREATE TABLE `lesson_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`version` integer NOT NULL,
	`content_url` text,
	`body` text,
	`provenance_id` text NOT NULL,
	`published_at` integer,
	`retired_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`provenance_id`) REFERENCES `provenance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `lesson_versions_lesson_idx` ON `lesson_versions` (`lesson_id`);--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`level` text NOT NULL,
	`skill` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`current_version_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `lessons_status_idx` ON `lessons` (`status`);--> statement-breakpoint
CREATE INDEX `lessons_level_idx` ON `lessons` (`level`);--> statement-breakpoint
CREATE TABLE `provenance` (
	`id` text PRIMARY KEY NOT NULL,
	`source_name` text NOT NULL,
	`source_url` text,
	`licence` text NOT NULL,
	`licence_url` text,
	`attribution_text` text DEFAULT '' NOT NULL,
	`retrieved_at` integer,
	`modifications` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL
);
