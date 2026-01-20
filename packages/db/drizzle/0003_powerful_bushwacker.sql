ALTER TABLE `users` ADD `specialty` text;--> statement-breakpoint
ALTER TABLE `users` ADD `work_place` text;--> statement-breakpoint
ALTER TABLE `drugInfo` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `drugInfo` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `agent_stats` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `agent_stats` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `agent_stats` ADD `view_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `agent_stats` ADD `bookmark_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `agents` ADD `created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL;--> statement-breakpoint
ALTER TABLE `agents` ADD `updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `companies` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `company_stats` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `company_stats` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `company_stats` ADD `view_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `company_stats` ADD `bookmark_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `countries` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `countries` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `drug_stats` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `drug_stats` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `drugs` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `drugs` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `generic_stats` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `generic_stats` ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE `generic_stats` ADD `view_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `generic_stats` ADD `bookmark_count` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `generics` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `generics` ADD `updated_at` integer;