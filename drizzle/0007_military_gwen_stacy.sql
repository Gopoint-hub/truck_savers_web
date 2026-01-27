CREATE TABLE `course_waitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`city` varchar(100) NOT NULL,
	`status` enum('pendiente','contactado','inscrito','cancelado') DEFAULT 'pendiente',
	`notes` text,
	`contactedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_waitlist_id` PRIMARY KEY(`id`)
);
