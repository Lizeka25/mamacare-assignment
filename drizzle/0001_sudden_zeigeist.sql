CREATE TABLE `care_appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(140) NOT NULL,
	`appointmentDate` varchar(16) NOT NULL,
	`facility` varchar(180),
	`completed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `care_appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `care_child_milestones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`childId` int NOT NULL,
	`title` varchar(140) NOT NULL,
	`milestoneDate` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `care_child_milestones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `care_children` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`birthDate` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `care_children_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `care_essentials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(140) NOT NULL,
	`category` varchar(60) NOT NULL,
	`estimatedCost` int NOT NULL DEFAULT 0,
	`packed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `care_essentials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `care_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`role` enum('expecting','mother','caregiver') NOT NULL DEFAULT 'expecting',
	`region` varchar(80) NOT NULL,
	`pregnancyWeek` int,
	`dueDate` varchar(10),
	`preferredFacility` varchar(180),
	`emergencyContactName` varchar(120),
	`emergencyContactPhone` varchar(40),
	`transportPlan` text,
	`birthChecklist` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `care_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `care_profiles_userId_unique` UNIQUE(`userId`)
);
