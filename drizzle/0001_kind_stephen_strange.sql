CREATE TABLE `business_lines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `business_lines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`isActive` boolean DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cms_modules_id` PRIMARY KEY(`id`),
	CONSTRAINT `cms_modules_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`state` varchar(50),
	`country` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_sends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`newsletterId` int NOT NULL,
	`subscriberId` int NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`openedAt` timestamp,
	`clickedAt` timestamp,
	`status` enum('sent','delivered','opened','clicked','bounced','failed') DEFAULT 'sent',
	CONSTRAINT `newsletter_sends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` varchar(500) NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','scheduled','sent','cancelled') DEFAULT 'draft',
	`scheduledAt` timestamp,
	`sentAt` timestamp,
	`recipientCount` int DEFAULT 0,
	`openCount` int DEFAULT 0,
	`clickCount` int DEFAULT 0,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `objectives` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessLineId` int,
	`locationId` int,
	`serviceProduct` varchar(200) NOT NULL,
	`targetValue` varchar(100) NOT NULL,
	`targetNumeric` int,
	`period` enum('daily','weekly','monthly','quarterly','yearly') DEFAULT 'monthly',
	`currentProgress` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `objectives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seo_checklist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`area` varchar(100) NOT NULL,
	`item` varchar(500) NOT NULL,
	`status` enum('pendiente','en_progreso','completado') DEFAULT 'pendiente',
	`notes` text,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_checklist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(200),
	`phone` varchar(50),
	`company` varchar(200),
	`location` varchar(100),
	`language` enum('es','en') DEFAULT 'es',
	`source` varchar(100),
	`tags` text,
	`isActive` boolean DEFAULT true,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `task_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`color` varchar(20) DEFAULT '#368A45',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `task_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessLineId` int,
	`locationId` int,
	`objectiveId` int,
	`categoryId` int,
	`title` varchar(500) NOT NULL,
	`description` text,
	`priority` enum('alta','media','baja') DEFAULT 'media',
	`status` enum('pendiente','en_progreso','completada','cancelada') DEFAULT 'pendiente',
	`dueDate` timestamp,
	`assignedTo` int,
	`createdBy` int,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_module_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`canView` boolean DEFAULT true,
	`canCreate` boolean DEFAULT false,
	`canEdit` boolean DEFAULT false,
	`canDelete` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_module_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `newsletter_sends` ADD CONSTRAINT `newsletter_sends_newsletterId_newsletters_id_fk` FOREIGN KEY (`newsletterId`) REFERENCES `newsletters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_sends` ADD CONSTRAINT `newsletter_sends_subscriberId_subscribers_id_fk` FOREIGN KEY (`subscriberId`) REFERENCES `subscribers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletters` ADD CONSTRAINT `newsletters_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `objectives` ADD CONSTRAINT `objectives_businessLineId_business_lines_id_fk` FOREIGN KEY (`businessLineId`) REFERENCES `business_lines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `objectives` ADD CONSTRAINT `objectives_locationId_locations_id_fk` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_businessLineId_business_lines_id_fk` FOREIGN KEY (`businessLineId`) REFERENCES `business_lines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_locationId_locations_id_fk` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_objectiveId_objectives_id_fk` FOREIGN KEY (`objectiveId`) REFERENCES `objectives`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_categoryId_task_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `task_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignedTo_users_id_fk` FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_module_permissions` ADD CONSTRAINT `user_module_permissions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_module_permissions` ADD CONSTRAINT `user_module_permissions_moduleId_cms_modules_id_fk` FOREIGN KEY (`moduleId`) REFERENCES `cms_modules`(`id`) ON DELETE no action ON UPDATE no action;