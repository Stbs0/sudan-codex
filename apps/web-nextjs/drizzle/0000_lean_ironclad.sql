CREATE TABLE `agents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `agents_name_unique` ON `agents` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `agents_slug_unique` ON `agents` (`slug`);--> statement-breakpoint
CREATE TABLE `companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `companies_name_unique` ON `companies` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_slug_unique` ON `companies` (`slug`);--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `drugs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`brand_name` text NOT NULL,
	`slug` text NOT NULL,
	`dosage_form` text,
	`strength` text,
	`company_id` integer,
	`company_name` text,
	`agent_id` integer,
	`agent_name` text,
	`generic_id` integer,
	`generic_name` text,
	`country_id` integer,
	`country_name` text,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`generic_id`) REFERENCES `generics`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drugs_slug_unique` ON `drugs` (`slug`);--> statement-breakpoint
CREATE INDEX `brand_name_idx` ON `drugs` (`brand_name`);--> statement-breakpoint
CREATE INDEX `company_name_idx` ON `drugs` (`company_name`);--> statement-breakpoint
CREATE INDEX `agent_name_idx` ON `drugs` (`agent_name`);--> statement-breakpoint
CREATE INDEX `generic_name_idx` ON `drugs` (`generic_name`);--> statement-breakpoint
CREATE INDEX `country_name_idx` ON `drugs` (`country_name`);--> statement-breakpoint
CREATE TABLE `generics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `generics_name_unique` ON `generics` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `generics_slug_unique` ON `generics` (`slug`);