CREATE TABLE `lesson_completions` (
	`learner_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`completed_at` integer NOT NULL,
	PRIMARY KEY(`learner_id`, `lesson_id`),
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `lesson_completions_learner_idx` ON `lesson_completions` (`learner_id`);