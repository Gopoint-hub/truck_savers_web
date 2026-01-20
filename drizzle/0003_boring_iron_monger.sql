CREATE TABLE `roadmap_deliverables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stageId` int NOT NULL,
	`name` varchar(300) NOT NULL,
	`description` text,
	`status` enum('pendiente','en_progreso','completado') DEFAULT 'pendiente',
	`sortOrder` int DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `roadmap_deliverables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roadmap_stages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`sortOrder` int DEFAULT 0,
	`color` varchar(20) DEFAULT '#368A45',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `roadmap_stages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `roadmap_deliverables` ADD CONSTRAINT `roadmap_deliverables_stageId_roadmap_stages_id_fk` FOREIGN KEY (`stageId`) REFERENCES `roadmap_stages`(`id`) ON DELETE no action ON UPDATE no action;