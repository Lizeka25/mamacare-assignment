import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const dateTimeInput = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Use a valid date and time");
const dateInput = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date");

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  care: router({
    profile: router({
      get: protectedProcedure.query(({ ctx }) => db.getCareProfile(ctx.user.id)),
      save: protectedProcedure
        .input(z.object({
          role: z.enum(["expecting", "mother", "caregiver"]),
          region: z.string().trim().min(1).max(80),
          pregnancyWeek: z.number().int().min(1).max(42).nullable(),
          dueDate: dateInput.nullable(),
          preferredFacility: z.string().trim().max(180).nullable(),
          emergencyContactName: z.string().trim().max(120).nullable(),
          emergencyContactPhone: z.string().trim().max(40).nullable(),
          transportPlan: z.string().trim().max(1000).nullable(),
        }))
        .mutation(({ ctx, input }) => db.saveCareProfile(ctx.user.id, input)),
      setChecklistStep: protectedProcedure
        .input(z.object({ step: z.number().int().min(0).max(5), completed: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
          const result = await db.setBirthChecklist(ctx.user.id, input.step, input.completed);
          if (result === null) throw new TRPCError({ code: "NOT_FOUND", message: "Care profile not found" });
          return { birthChecklist: result };
        }),
      setPostpartumChecklistStep: protectedProcedure
        .input(z.object({ step: z.number().int().min(0).max(7), completed: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
          const result = await db.setPostpartumChecklist(ctx.user.id, input.step, input.completed);
          if (result === null) throw new TRPCError({ code: "NOT_FOUND", message: "Care profile not found" });
          return { postpartumChecklist: result };
        }),
    }),
    appointments: router({
      list: protectedProcedure.query(({ ctx }) => db.listAppointments(ctx.user.id)),
      create: protectedProcedure
        .input(z.object({
          title: z.string().trim().min(1).max(140),
          appointmentDate: dateTimeInput,
          facility: z.string().trim().max(180).optional(),
        }))
        .mutation(({ ctx, input }) => db.createAppointment(ctx.user.id, input)),
      setCompleted: protectedProcedure
        .input(z.object({ id: z.number().int().positive(), completed: z.boolean() }))
        .mutation(({ ctx, input }) => db.updateAppointment(ctx.user.id, input.id, input.completed)),
      remove: protectedProcedure
        .input(z.object({ id: z.number().int().positive() }))
        .mutation(({ ctx, input }) => db.deleteAppointment(ctx.user.id, input.id)),
    }),
    essentials: router({
      list: protectedProcedure.query(({ ctx }) => db.listEssentials(ctx.user.id)),
      create: protectedProcedure
        .input(z.object({
          label: z.string().trim().min(1).max(140),
          category: z.string().trim().min(1).max(60),
          estimatedCost: z.number().int().min(0).max(1000000),
        }))
        .mutation(({ ctx, input }) => db.createEssential(ctx.user.id, input)),
      setPacked: protectedProcedure
        .input(z.object({ id: z.number().int().positive(), packed: z.boolean() }))
        .mutation(({ ctx, input }) => db.updateEssential(ctx.user.id, input.id, input.packed)),
      remove: protectedProcedure
        .input(z.object({ id: z.number().int().positive() }))
        .mutation(({ ctx, input }) => db.deleteEssential(ctx.user.id, input.id)),
    }),
    children: router({
      list: protectedProcedure.query(({ ctx }) => db.listChildren(ctx.user.id)),
      create: protectedProcedure
        .input(z.object({ name: z.string().trim().min(1).max(100), birthDate: dateInput.optional() }))
        .mutation(({ ctx, input }) => db.createChild(ctx.user.id, input)),
      remove: protectedProcedure
        .input(z.object({ id: z.number().int().positive() }))
        .mutation(({ ctx, input }) => db.deleteChild(ctx.user.id, input.id)),
      milestones: protectedProcedure.query(({ ctx }) => db.listChildMilestones(ctx.user.id)),
      addMilestone: protectedProcedure
        .input(z.object({
          childId: z.number().int().positive(),
          title: z.string().trim().min(1).max(140),
          milestoneDate: dateInput.optional(),
        }))
        .mutation(async ({ ctx, input }) => {
          const result = await db.createChildMilestone(ctx.user.id, input.childId, input);
          if (!result) throw new TRPCError({ code: "NOT_FOUND", message: "Child profile not found" });
          return result;
        }),
      removeMilestone: protectedProcedure
        .input(z.object({ id: z.number().int().positive() }))
        .mutation(({ ctx, input }) => db.deleteChildMilestone(ctx.user.id, input.id)),
    }),
  }),
});

export type AppRouter = typeof appRouter;
