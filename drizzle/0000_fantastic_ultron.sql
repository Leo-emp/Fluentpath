CREATE TABLE `skill_edges` (
	`from_node_id` text NOT NULL,
	`to_node_id` text NOT NULL,
	`strength` real DEFAULT 1 NOT NULL,
	PRIMARY KEY(`from_node_id`, `to_node_id`),
	FOREIGN KEY (`from_node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to_node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `skill_edges_to_idx` ON `skill_edges` (`to_node_id`);--> statement-breakpoint
CREATE TABLE `skill_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`level` text NOT NULL,
	`skill` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`metadata` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `skill_nodes_level_idx` ON `skill_nodes` (`level`);--> statement-breakpoint
CREATE INDEX `skill_nodes_type_idx` ON `skill_nodes` (`type`);--> statement-breakpoint
CREATE INDEX `skill_nodes_skill_idx` ON `skill_nodes` (`skill`);