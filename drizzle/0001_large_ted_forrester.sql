CREATE TABLE `learner_mastery` (
	`learner_id` text NOT NULL,
	`node_id` text NOT NULL,
	`mastery` real DEFAULT 0 NOT NULL,
	`confidence` real DEFAULT 0 NOT NULL,
	`exposures` integer DEFAULT 0 NOT NULL,
	`correct_streak` integer DEFAULT 0 NOT NULL,
	`last_seen_at` integer NOT NULL,
	PRIMARY KEY(`learner_id`, `node_id`),
	FOREIGN KEY (`node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `learner_mastery_learner_idx` ON `learner_mastery` (`learner_id`);