CREATE TABLE `learners` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`l1` text,
	`current_level` text,
	`tier` text DEFAULT 'free' NOT NULL,
	`paddle_customer_id` text,
	`paddle_subscription_id` text,
	`subscription_status` text DEFAULT 'none' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learners_email_unique` ON `learners` (`email`);--> statement-breakpoint
CREATE INDEX `learners_tier_idx` ON `learners` (`tier`);--> statement-breakpoint
CREATE TABLE `test_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`exam_id` text NOT NULL,
	`status` text NOT NULL,
	`state` text NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `test_sessions_learner_idx` ON `test_sessions` (`learner_id`);--> statement-breakpoint
CREATE INDEX `test_sessions_status_idx` ON `test_sessions` (`status`);--> statement-breakpoint
CREATE INDEX `test_sessions_learner_status_idx` ON `test_sessions` (`learner_id`,`status`);--> statement-breakpoint
CREATE TABLE `test_results` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`learner_id` text NOT NULL,
	`exam_id` text NOT NULL,
	`overall_band` real NOT NULL,
	`section_bands` text NOT NULL,
	`sections_included` text NOT NULL,
	`sections_missing` text NOT NULL,
	`performance_record` text NOT NULL,
	`completed_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `test_sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `test_results_session_id_unique` ON `test_results` (`session_id`);--> statement-breakpoint
CREATE INDEX `test_results_learner_idx` ON `test_results` (`learner_id`);--> statement-breakpoint
CREATE INDEX `test_results_exam_idx` ON `test_results` (`exam_id`);--> statement-breakpoint
CREATE INDEX `test_results_learner_completed_idx` ON `test_results` (`learner_id`,`completed_at`);--> statement-breakpoint
CREATE TABLE `diagnoses` (
	`id` text PRIMARY KEY NOT NULL,
	`test_result_id` text NOT NULL,
	`learner_id` text NOT NULL,
	`gap_count` integer NOT NULL,
	`top_root_cause` text,
	`total_study_minutes` integer NOT NULL,
	`diagnosis` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`test_result_id`) REFERENCES `test_results`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `diagnoses_test_result_id_unique` ON `diagnoses` (`test_result_id`);--> statement-breakpoint
CREATE INDEX `diagnoses_learner_idx` ON `diagnoses` (`learner_id`);--> statement-breakpoint
CREATE TABLE `placement_results` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`estimated_level` text,
	`level_results` text,
	`items_used` integer DEFAULT 0 NOT NULL,
	`state` text NOT NULL,
	`status` text NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `placement_results_learner_idx` ON `placement_results` (`learner_id`);--> statement-breakpoint
CREATE INDEX `placement_results_learner_status_idx` ON `placement_results` (`learner_id`,`status`);--> statement-breakpoint
CREATE TABLE `practice_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`status` text NOT NULL,
	`plan` text NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `practice_sessions_learner_status_idx` ON `practice_sessions` (`learner_id`,`status`);--> statement-breakpoint
ALTER TABLE `learner_mastery` ALTER COLUMN "learner_id" TO "learner_id" text NOT NULL REFERENCES learners(id) ON DELETE cascade ON UPDATE no action;