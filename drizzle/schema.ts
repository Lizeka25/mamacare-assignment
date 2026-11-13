import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/** Core user table backing the platform's Manus OAuth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** One private profile and birth-preparedness plan per authenticated account. */
export const careProfiles = mysqlTable("care_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  role: mysqlEnum("role", ["expecting", "mother", "caregiver"]).default("expecting").notNull(),
  region: varchar("region", { length: 80 }).notNull(),
  pregnancyWeek: int("pregnancyWeek"),
  dueDate: varchar("dueDate", { length: 10 }),
  preferredFacility: varchar("preferredFacility", { length: 180 }),
  emergencyContactName: varchar("emergencyContactName", { length: 120 }),
  emergencyContactPhone: varchar("emergencyContactPhone", { length: 40 }),
  transportPlan: text("transportPlan"),
  birthChecklist: int("birthChecklist").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const careAppointments = mysqlTable("care_appointments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 140 }).notNull(),
  appointmentDate: varchar("appointmentDate", { length: 16 }).notNull(),
  facility: varchar("facility", { length: 180 }),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const careEssentials = mysqlTable("care_essentials", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  label: varchar("label", { length: 140 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  estimatedCost: int("estimatedCost").default(0).notNull(),
  packed: boolean("packed").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const careChildren = mysqlTable("care_children", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  birthDate: varchar("birthDate", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const careChildMilestones = mysqlTable("care_child_milestones", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  childId: int("childId").notNull(),
  title: varchar("title", { length: 140 }).notNull(),
  milestoneDate: varchar("milestoneDate", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CareProfile = typeof careProfiles.$inferSelect;
export type CareAppointment = typeof careAppointments.$inferSelect;
export type CareEssential = typeof careEssentials.$inferSelect;
export type CareChild = typeof careChildren.$inferSelect;
export type CareChildMilestone = typeof careChildMilestones.$inferSelect;
