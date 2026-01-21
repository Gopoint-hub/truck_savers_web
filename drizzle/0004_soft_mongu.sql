CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(200),
	`phone` varchar(50),
	`company` varchar(200),
	`location` varchar(100),
	`locationId` int,
	`businessLineId` int,
	`notes` text,
	`tags` text,
	`isActive` boolean DEFAULT true,
	`lastServiceDate` timestamp,
	`totalServices` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`),
	CONSTRAINT `clients_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_clicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`newsletterId` int NOT NULL,
	`subscriberId` int,
	`linkUrl` text NOT NULL,
	`linkText` varchar(200),
	`clickedAt` timestamp NOT NULL DEFAULT (now()),
	`userAgent` text,
	`ipAddress` varchar(45),
	CONSTRAINT `newsletter_clicks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `newsletters` MODIFY COLUMN `status` enum('draft','scheduled','sending','sent','cancelled') DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `newsletters` ADD `previewText` varchar(200);--> statement-breakpoint
ALTER TABLE `newsletters` ADD `htmlContent` text;--> statement-breakpoint
ALTER TABLE `newsletters` ADD `aiPrompt` text;--> statement-breakpoint
ALTER TABLE `newsletters` ADD `scheduledTimezone` varchar(50) DEFAULT 'America/Chicago';--> statement-breakpoint
ALTER TABLE `newsletters` ADD `deliveredCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `newsletters` ADD `bounceCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `newsletters` ADD `unsubscribeCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `clients` ADD CONSTRAINT `clients_locationId_locations_id_fk` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `clients` ADD CONSTRAINT `clients_businessLineId_business_lines_id_fk` FOREIGN KEY (`businessLineId`) REFERENCES `business_lines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_clicks` ADD CONSTRAINT `newsletter_clicks_newsletterId_newsletters_id_fk` FOREIGN KEY (`newsletterId`) REFERENCES `newsletters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_clicks` ADD CONSTRAINT `newsletter_clicks_subscriberId_subscribers_id_fk` FOREIGN KEY (`subscriberId`) REFERENCES `subscribers`(`id`) ON DELETE no action ON UPDATE no action;