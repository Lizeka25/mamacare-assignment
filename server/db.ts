import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  CareProfile,
  InsertUser,
  careAppointments,
  careChildMilestones,
  careChildren,
  careEssentials,
  careProfiles,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      const value = user[field] ?? null;
      values[field] = value;
      updateSet[field] = value;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

function requireDb(db: Awaited<ReturnType<typeof getDb>>) {
  if (!db) throw new Error("Database is not available");
  return db;
}

export async function getCareProfile(userId: number) {
  const db = requireDb(await getDb());
  const result = await db.select().from(careProfiles).where(eq(careProfiles.userId, userId)).limit(1);
  return result[0] ?? null;
}

export async function saveCareProfile(userId: number, input: Omit<CareProfile, "id" | "userId" | "createdAt" | "updatedAt" | "birthChecklist" | "postpartumChecklist">) {
  const db = requireDb(await getDb());
  await db.insert(careProfiles).values({ userId, ...input }).onDuplicateKeyUpdate({
    set: {
      role: input.role,
      region: input.region,
      pregnancyWeek: input.pregnancyWeek,
      dueDate: input.dueDate,
      preferredFacility: input.preferredFacility,
      emergencyContactName: input.emergencyContactName,
      emergencyContactPhone: input.emergencyContactPhone,
      transportPlan: input.transportPlan,
    },
  });
  return getCareProfile(userId);
}

export async function setBirthChecklist(userId: number, step: number, completed: boolean) {
  const db = requireDb(await getDb());
  const profile = await getCareProfile(userId);
  if (!profile) return null;
  const mask = 1 << step;
  const birthChecklist = completed ? profile.birthChecklist | mask : profile.birthChecklist & ~mask;
  await db.update(careProfiles).set({ birthChecklist }).where(eq(careProfiles.userId, userId));
  return birthChecklist;
}

export async function setPostpartumChecklist(userId: number, step: number, completed: boolean) {
  const db = requireDb(await getDb());
  const profile = await getCareProfile(userId);
  if (!profile) return null;
  const mask = 1 << step;
  const postpartumChecklist = completed ? profile.postpartumChecklist | mask : profile.postpartumChecklist & ~mask;
  await db.update(careProfiles).set({ postpartumChecklist }).where(eq(careProfiles.userId, userId));
  return postpartumChecklist;
}

export async function listAppointments(userId: number) {
  const db = requireDb(await getDb());
  return db.select().from(careAppointments).where(eq(careAppointments.userId, userId)).orderBy(asc(careAppointments.appointmentDate));
}

export async function createAppointment(userId: number, input: { title: string; appointmentDate: string; facility?: string }) {
  const db = requireDb(await getDb());
  const result = await db.insert(careAppointments).values({ userId, ...input, facility: input.facility || null });
  return { id: Number(result[0].insertId), ...input, facility: input.facility || null, completed: false };
}

export async function updateAppointment(userId: number, id: number, completed: boolean) {
  const db = requireDb(await getDb());
  await db.update(careAppointments).set({ completed }).where(and(eq(careAppointments.id, id), eq(careAppointments.userId, userId)));
  return { success: true };
}

export async function deleteAppointment(userId: number, id: number) {
  const db = requireDb(await getDb());
  await db.delete(careAppointments).where(and(eq(careAppointments.id, id), eq(careAppointments.userId, userId)));
  return { success: true };
}

export async function listEssentials(userId: number) {
  const db = requireDb(await getDb());
  return db.select().from(careEssentials).where(eq(careEssentials.userId, userId)).orderBy(asc(careEssentials.createdAt));
}

export async function createEssential(userId: number, input: { label: string; category: string; estimatedCost: number }) {
  const db = requireDb(await getDb());
  const result = await db.insert(careEssentials).values({ userId, ...input });
  return { id: Number(result[0].insertId), ...input, packed: false };
}

export async function updateEssential(userId: number, id: number, packed: boolean) {
  const db = requireDb(await getDb());
  await db.update(careEssentials).set({ packed }).where(and(eq(careEssentials.id, id), eq(careEssentials.userId, userId)));
  return { success: true };
}

export async function deleteEssential(userId: number, id: number) {
  const db = requireDb(await getDb());
  await db.delete(careEssentials).where(and(eq(careEssentials.id, id), eq(careEssentials.userId, userId)));
  return { success: true };
}

export async function listChildren(userId: number) {
  const db = requireDb(await getDb());
  return db.select().from(careChildren).where(eq(careChildren.userId, userId)).orderBy(asc(careChildren.createdAt));
}

export async function createChild(userId: number, input: { name: string; birthDate?: string }) {
  const db = requireDb(await getDb());
  const result = await db.insert(careChildren).values({ userId, ...input, birthDate: input.birthDate || null });
  return { id: Number(result[0].insertId), ...input, birthDate: input.birthDate || null };
}

export async function deleteChild(userId: number, id: number) {
  const db = requireDb(await getDb());
  const existing = await db.select({ id: careChildren.id }).from(careChildren).where(and(eq(careChildren.id, id), eq(careChildren.userId, userId))).limit(1);
  if (existing.length === 0) return { success: false };
  await db.delete(careChildMilestones).where(and(eq(careChildMilestones.childId, id), eq(careChildMilestones.userId, userId)));
  await db.delete(careChildren).where(and(eq(careChildren.id, id), eq(careChildren.userId, userId)));
  return { success: true };
}

export async function listChildMilestones(userId: number) {
  const db = requireDb(await getDb());
  return db.select().from(careChildMilestones).where(eq(careChildMilestones.userId, userId)).orderBy(asc(careChildMilestones.createdAt));
}

export async function createChildMilestone(userId: number, childId: number, input: { title: string; milestoneDate?: string }) {
  const db = requireDb(await getDb());
  const child = await db.select({ id: careChildren.id }).from(careChildren).where(and(eq(careChildren.id, childId), eq(careChildren.userId, userId))).limit(1);
  if (child.length === 0) return null;
  const result = await db.insert(careChildMilestones).values({
    userId,
    childId,
    title: input.title,
    milestoneDate: input.milestoneDate || null,
  });
  return { id: Number(result[0].insertId), userId, childId, ...input, milestoneDate: input.milestoneDate || null };
}

export async function deleteChildMilestone(userId: number, id: number) {
  const db = requireDb(await getDb());
  await db.delete(careChildMilestones).where(and(eq(careChildMilestones.id, id), eq(careChildMilestones.userId, userId)));
  return { success: true };
}
