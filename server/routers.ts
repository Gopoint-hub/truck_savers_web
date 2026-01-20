import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Admin procedure - requires admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

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

  // ============================================
  // USERS MANAGEMENT
  // ============================================
  users: router({
    list: adminProcedure.query(async () => {
      return db.getAllUsers();
    }),
    create: adminProcedure
      .input(z.object({ 
        email: z.string().email(), 
        name: z.string().optional(),
        role: z.enum(["user", "admin"]) 
      }))
      .mutation(async ({ input }) => {
        // Check if user already exists
        const existingUser = await db.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Ya existe un usuario con este email' });
        }
        await db.createUser(input);
        return { success: true };
      }),
    updateRole: adminProcedure
      .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ input }) => {
        await db.updateUserRole(input.userId, input.role);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteUser(input.userId);
        return { success: true };
      }),
  }),

  // ============================================
  // BUSINESS LINES
  // ============================================
  businessLines: router({
    list: protectedProcedure.query(async () => {
      return db.getAllBusinessLines();
    }),
    create: adminProcedure
      .input(z.object({ name: z.string(), description: z.string().optional() }))
      .mutation(async ({ input }) => {
        await db.createBusinessLine(input);
        return { success: true };
      }),
  }),

  // ============================================
  // LOCATIONS
  // ============================================
  locations: router({
    list: protectedProcedure.query(async () => {
      return db.getAllLocations();
    }),
    create: adminProcedure
      .input(z.object({ 
        name: z.string(), 
        state: z.string().optional(),
        country: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        await db.createLocation(input);
        return { success: true };
      }),
  }),

  // ============================================
  // TASK CATEGORIES
  // ============================================
  taskCategories: router({
    list: protectedProcedure.query(async () => {
      return db.getAllTaskCategories();
    }),
    create: adminProcedure
      .input(z.object({ name: z.string(), color: z.string().optional() }))
      .mutation(async ({ input }) => {
        await db.createTaskCategory(input);
        return { success: true };
      }),
  }),

  // ============================================
  // OBJECTIVES (METAS)
  // ============================================
  objectives: router({
    list: protectedProcedure.query(async () => {
      return db.getAllObjectives();
    }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getObjectiveById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        businessLineId: z.number().optional(),
        locationId: z.number().optional(),
        serviceProduct: z.string(),
        targetValue: z.string(),
        targetNumeric: z.number().optional(),
        period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]).optional(),
        currentProgress: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createObjective(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        businessLineId: z.number().optional(),
        locationId: z.number().optional(),
        serviceProduct: z.string().optional(),
        targetValue: z.string().optional(),
        targetNumeric: z.number().optional(),
        period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]).optional(),
        currentProgress: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateObjective(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteObjective(input.id);
        return { success: true };
      }),
  }),

  // ============================================
  // TASKS (PENDIENTES)
  // ============================================
  tasks: router({
    list: protectedProcedure
      .input(z.object({
        status: z.string().optional(),
        priority: z.string().optional(),
        categoryId: z.number().optional(),
        businessLineId: z.number().optional(),
        locationId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getAllTasks(input);
      }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getTaskById(input.id);
      }),
    stats: protectedProcedure.query(async () => {
      return db.getTaskStats();
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        businessLineId: z.number().optional(),
        locationId: z.number().optional(),
        objectiveId: z.number().optional(),
        categoryId: z.number().optional(),
        priority: z.enum(["alta", "media", "baja"]).optional(),
        status: z.enum(["pendiente", "en_progreso", "completada", "cancelada"]).optional(),
        dueDate: z.date().optional(),
        assignedTo: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createTask({ ...input, createdBy: ctx.user.id });
        return { success: true };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        businessLineId: z.number().optional(),
        locationId: z.number().optional(),
        objectiveId: z.number().optional(),
        categoryId: z.number().optional(),
        priority: z.enum(["alta", "media", "baja"]).optional(),
        status: z.enum(["pendiente", "en_progreso", "completada", "cancelada"]).optional(),
        dueDate: z.date().optional(),
        assignedTo: z.number().optional(),
        completedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        // If status is completada, set completedAt
        if (data.status === 'completada' && !data.completedAt) {
          data.completedAt = new Date();
        }
        await db.updateTask(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTask(input.id);
        return { success: true };
      }),
  }),

  // ============================================
  // SUBSCRIBERS
  // ============================================
  subscribers: router({
    list: protectedProcedure
      .input(z.object({
        isActive: z.boolean().optional(),
        search: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.getAllSubscribers(input);
      }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getSubscriberById(input.id);
      }),
    stats: protectedProcedure.query(async () => {
      return db.getSubscriberStats();
    }),
    create: protectedProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        language: z.enum(["es", "en"]).optional(),
        source: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createSubscriber(input);
        return { success: true };
      }),
    bulkCreate: adminProcedure
      .input(z.array(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        language: z.enum(["es", "en"]).optional(),
        source: z.string().optional(),
        tags: z.string().optional(),
      })))
      .mutation(async ({ input }) => {
        await db.createManySubscribers(input);
        return { success: true, count: input.length };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        email: z.string().email().optional(),
        name: z.string().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        language: z.enum(["es", "en"]).optional(),
        tags: z.string().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateSubscriber(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteSubscriber(input.id);
        return { success: true };
      }),
  }),

  // ============================================
  // NEWSLETTERS
  // ============================================
  newsletters: router({
    list: protectedProcedure.query(async () => {
      return db.getAllNewsletters();
    }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getNewsletterById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        subject: z.string(),
        content: z.string(),
        status: z.enum(["draft", "scheduled", "sent", "cancelled"]).optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createNewsletter({ ...input, createdBy: ctx.user.id });
        return { success: true };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        subject: z.string().optional(),
        content: z.string().optional(),
        status: z.enum(["draft", "scheduled", "sent", "cancelled"]).optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateNewsletter(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNewsletter(input.id);
        return { success: true };
      }),
  }),

  // ============================================
  // CMS MODULES
  // ============================================
  cmsModules: router({
    list: protectedProcedure.query(async () => {
      return db.getAllCmsModules();
    }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createCmsModule(input);
        return { success: true };
      }),
  }),

  // ============================================
  // USER MODULE PERMISSIONS
  // ============================================
  permissions: router({
    getUserPermissions: adminProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getUserModulePermissions(input.userId);
      }),
    setPermission: adminProcedure
      .input(z.object({
        userId: z.number(),
        moduleId: z.number(),
        canView: z.boolean().optional(),
        canCreate: z.boolean().optional(),
        canEdit: z.boolean().optional(),
        canDelete: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.setUserModulePermission(input);
        return { success: true };
      }),
  }),

  // ============================================
  // SEO CHECKLIST
  // ============================================
  seoChecklist: router({
    list: protectedProcedure.query(async () => {
      return db.getAllSeoChecklist();
    }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendiente", "en_progreso", "completado"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        if (data.status === 'completado') {
          await db.updateSeoChecklistItem(id, { ...data, completedAt: new Date() });
        } else {
          await db.updateSeoChecklistItem(id, data);
        }
        return { success: true };
      }),
    create: adminProcedure
      .input(z.object({
        area: z.string(),
        item: z.string(),
        status: z.enum(["pendiente", "en_progreso", "completado"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createSeoChecklistItem(input);
        return { success: true };
      }),
  }),

  // ============================================
  // DASHBOARD STATS
  // ============================================
  dashboard: router({
    stats: protectedProcedure.query(async () => {
      const [taskStats, subscriberStats, objectives, tasks] = await Promise.all([
        db.getTaskStats(),
        db.getSubscriberStats(),
        db.getAllObjectives(),
        db.getAllTasks(),
      ]);
      
      // Calculate objectives progress
      const activeObjectives = objectives.filter(o => o.isActive);
      const objectivesWithProgress = activeObjectives.map(obj => ({
        ...obj,
        progressPercentage: obj.targetNumeric && obj.currentProgress 
          ? Math.round((obj.currentProgress / obj.targetNumeric) * 100)
          : 0
      }));
      
      // Get recent tasks
      const recentTasks = tasks.slice(0, 5);
      
      // Get high priority pending tasks
      const highPriorityTasks = tasks.filter(t => t.priority === 'alta' && t.status === 'pendiente');
      
      return {
        tasks: taskStats,
        subscribers: subscriberStats,
        objectives: {
          total: objectives.length,
          active: activeObjectives.length,
          withProgress: objectivesWithProgress,
        },
        recentTasks,
        highPriorityTasks,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
