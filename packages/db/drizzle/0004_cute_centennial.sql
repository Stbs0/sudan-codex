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
CREATE TABLE `drug_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`drug_id` integer NOT NULL,
	`view_count` integer DEFAULT 0,
	`bookmark_count` integer DEFAULT 0,
	FOREIGN KEY (`drug_id`) REFERENCES `drugs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drug_stats_drug_id_unique` ON `drug_stats` (`drug_id`);--> statement-breakpoint
CREATE TABLE `generic_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`generic_id` integer NOT NULL,
	`total_brands` integer DEFAULT 0,
	`related_companies` integer DEFAULT 0,
	`related_agents` integer DEFAULT 0,
	FOREIGN KEY (`generic_id`) REFERENCES `generics`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `generic_stats_generic_id_unique` ON `generic_stats` (`generic_id`);