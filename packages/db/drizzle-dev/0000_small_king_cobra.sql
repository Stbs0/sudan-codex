CREATE TABLE `agent_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agent_id` integer NOT NULL,
	`total_brands` integer DEFAULT 0,
	`related_companies` integer DEFAULT 0,
	`related_generics` integer DEFAULT 0,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `agent_stats_agent_id_unique` ON `agent_stats` (`agent_id`);--> statement-breakpoint
CREATE TABLE `agents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `agents_name_unique` ON `agents` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `agents_slug_unique` ON `agents` (`slug`);--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `accounts_userId_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `sessions_userId_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`is_profile_complete` integer DEFAULT false,
	`age` integer,
	`phone_number` text,
	`university` text,
	`occupation` text,
	`specialty` text,
	`work_place` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `verifications` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verifications_identifier_idx` ON `verifications` (`identifier`);--> statement-breakpoint
CREATE TABLE `companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `companies_name_unique` ON `companies` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_slug_unique` ON `companies` (`slug`);--> statement-breakpoint
CREATE TABLE `company_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer NOT NULL,
	`total_brands` integer DEFAULT 0,
	`related_agents` integer DEFAULT 0,
	`related_generics` integer DEFAULT 0,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `company_stats_company_id_unique` ON `company_stats` (`company_id`);--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `drugInfo` (
	`drug_id` integer PRIMARY KEY NOT NULL,
	`title` text DEFAULT 'null',
	`ind` text DEFAULT 'null',
	`adult` text DEFAULT 'null',
	`ped` text DEFAULT 'null',
	`side` text DEFAULT 'null',
	`prgnancy` text DEFAULT 'null',
	`intermajer` text DEFAULT 'null',
	`clinical` text DEFAULT 'null',
	`admin` text DEFAULT 'null',
	`interminor` text DEFAULT 'null',
	`contra` text DEFAULT 'null',
	`clas` text DEFAULT 'null',
	`mode` text DEFAULT 'null'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drugInfo_drug_id_unique` ON `drugInfo` (`drug_id`);--> statement-breakpoint
CREATE INDEX `drug_info_pkey_idx` ON `drugInfo` (`drug_id`);--> statement-breakpoint
CREATE TABLE `drug_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`drug_id` integer NOT NULL,
	`view_count` integer DEFAULT 0,
	`bookmark_count` integer DEFAULT 0,
	FOREIGN KEY (`drug_id`) REFERENCES `drugs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drug_stats_drug_id_unique` ON `drug_stats` (`drug_id`);--> statement-breakpoint
CREATE TABLE `drugs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`brand_name` text NOT NULL,
	`slug` text NOT NULL,
	`dosage_form` text,
	`pack_size` text,
	`strength` text,
	`company_id` integer,
	`company_name` text,
	`agent_id` integer,
	`agent_name` text,
	`generic_id` integer,
	`generic_name` text,
	`country_id` integer,
	`country_name` text,
	`drug_info_id` integer,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`generic_id`) REFERENCES `generics`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`drug_info_id`) REFERENCES `drugInfo`(`drug_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drugs_slug_unique` ON `drugs` (`slug`);--> statement-breakpoint
CREATE INDEX `brand_name_idx` ON `drugs` (`brand_name`);--> statement-breakpoint
CREATE INDEX `company_name_idx` ON `drugs` (`company_name`);--> statement-breakpoint
CREATE INDEX `agent_name_idx` ON `drugs` (`agent_name`);--> statement-breakpoint
CREATE INDEX `generic_name_idx` ON `drugs` (`generic_name`);--> statement-breakpoint
CREATE INDEX `country_name_idx` ON `drugs` (`country_name`);--> statement-breakpoint
CREATE TABLE `generic_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`generic_id` integer NOT NULL,
	`total_brands` integer DEFAULT 0,
	`related_companies` integer DEFAULT 0,
	`related_agents` integer DEFAULT 0,
	FOREIGN KEY (`generic_id`) REFERENCES `generics`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `generic_stats_generic_id_unique` ON `generic_stats` (`generic_id`);--> statement-breakpoint
CREATE TABLE `generics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `generics_name_unique` ON `generics` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `generics_slug_unique` ON `generics` (`slug`);