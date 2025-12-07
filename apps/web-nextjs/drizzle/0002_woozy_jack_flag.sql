PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_drugs` (
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
	`country_name` text
);
--> statement-breakpoint
INSERT INTO `__new_drugs`("id", "brand_name", "slug", "dosage_form", "pack_size", "strength", "company_id", "company_name", "agent_id", "agent_name", "generic_id", "generic_name", "country_id", "country_name") SELECT "id", "brand_name", "slug", "dosage_form", "pack_size", "strength", "company_id", "company_name", "agent_id", "agent_name", "generic_id", "generic_name", "country_id", "country_name" FROM `drugs`;--> statement-breakpoint
DROP TABLE `drugs`;--> statement-breakpoint
ALTER TABLE `__new_drugs` RENAME TO `drugs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `drugs_slug_unique` ON `drugs` (`slug`);--> statement-breakpoint
CREATE INDEX `brand_name_idx` ON `drugs` (`brand_name`);--> statement-breakpoint
CREATE INDEX `company_name_idx` ON `drugs` (`company_name`);--> statement-breakpoint
CREATE INDEX `agent_name_idx` ON `drugs` (`agent_name`);--> statement-breakpoint
CREATE INDEX `generic_name_idx` ON `drugs` (`generic_name`);--> statement-breakpoint
CREATE INDEX `country_name_idx` ON `drugs` (`country_name`);