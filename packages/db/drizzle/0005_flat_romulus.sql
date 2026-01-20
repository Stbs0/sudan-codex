DROP INDEX "agent_stats_agent_id_unique";--> statement-breakpoint
DROP INDEX "agents_name_unique";--> statement-breakpoint
DROP INDEX "agents_slug_unique";--> statement-breakpoint
DROP INDEX "accounts_userId_idx";--> statement-breakpoint
DROP INDEX "sessions_token_unique";--> statement-breakpoint
DROP INDEX "sessions_userId_idx";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "verifications_identifier_idx";--> statement-breakpoint
DROP INDEX "companies_name_unique";--> statement-breakpoint
DROP INDEX "companies_slug_unique";--> statement-breakpoint
DROP INDEX "company_stats_company_id_unique";--> statement-breakpoint
DROP INDEX "countries_name_unique";--> statement-breakpoint
DROP INDEX "drugInfo_drug_id_unique";--> statement-breakpoint
DROP INDEX "drug_info_pkey_idx";--> statement-breakpoint
DROP INDEX "drug_stats_drug_id_unique";--> statement-breakpoint
DROP INDEX "drugs_slug_unique";--> statement-breakpoint
DROP INDEX "brand_name_idx";--> statement-breakpoint
DROP INDEX "company_name_idx";--> statement-breakpoint
DROP INDEX "agent_name_idx";--> statement-breakpoint
DROP INDEX "generic_name_idx";--> statement-breakpoint
DROP INDEX "country_name_idx";--> statement-breakpoint
DROP INDEX "generic_stats_generic_id_unique";--> statement-breakpoint
DROP INDEX "generics_name_unique";--> statement-breakpoint
DROP INDEX "generics_slug_unique";--> statement-breakpoint
ALTER TABLE `agent_stats` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
CREATE UNIQUE INDEX `agent_stats_agent_id_unique` ON `agent_stats` (`agent_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `agents_name_unique` ON `agents` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `agents_slug_unique` ON `agents` (`slug`);--> statement-breakpoint
CREATE INDEX `accounts_userId_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `sessions_userId_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `verifications_identifier_idx` ON `verifications` (`identifier`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_name_unique` ON `companies` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `companies_slug_unique` ON `companies` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `company_stats_company_id_unique` ON `company_stats` (`company_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `drugInfo_drug_id_unique` ON `drugInfo` (`drug_id`);--> statement-breakpoint
CREATE INDEX `drug_info_pkey_idx` ON `drugInfo` (`drug_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `drug_stats_drug_id_unique` ON `drug_stats` (`drug_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `drugs_slug_unique` ON `drugs` (`slug`);--> statement-breakpoint
CREATE INDEX `brand_name_idx` ON `drugs` (`brand_name`);--> statement-breakpoint
CREATE INDEX `company_name_idx` ON `drugs` (`company_name`);--> statement-breakpoint
CREATE INDEX `agent_name_idx` ON `drugs` (`agent_name`);--> statement-breakpoint
CREATE INDEX `generic_name_idx` ON `drugs` (`generic_name`);--> statement-breakpoint
CREATE INDEX `country_name_idx` ON `drugs` (`country_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `generic_stats_generic_id_unique` ON `generic_stats` (`generic_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `generics_name_unique` ON `generics` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `generics_slug_unique` ON `generics` (`slug`);--> statement-breakpoint
ALTER TABLE `agent_stats` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `agents` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `agents` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `companies` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `companies` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `company_stats` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `company_stats` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `countries` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `countries` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drugInfo` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drugInfo` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drug_stats` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drug_stats` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drugs` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `drugs` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `generic_stats` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `generic_stats` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `generics` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));--> statement-breakpoint
ALTER TABLE `generics` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer));