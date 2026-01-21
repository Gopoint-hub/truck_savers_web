import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { sendInvitation, sendNewsletter } from "./email";
import { generateNewsletterWithAI, generateNewsletterImage } from "./newsletterAI";
import { transcribeAudio } from "./_core/voiceTranscription";
import { storagePut } from "./storage";

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
    sendInvitation: adminProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const user = await db.getUserById(input.userId);
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
        }
        if (!user.email) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'El usuario no tiene email configurado' });
        }
        
        // Construir URL de login
        const baseUrl = ctx.req.headers.origin || `https://${ctx.req.headers.host}`;
        const loginUrl = `${baseUrl}/cms`;
        
        const result = await sendInvitation({
          to: user.email,
          userName: user.name || user.email,
          inviterName: ctx.user.name || 'Administrador',
          loginUrl,
        });
        
        if (!result.success) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: result.error || 'Error al enviar invitación' });
        }
        
        return { success: true, message: 'Invitación enviada correctamente' };
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
        status: z.enum(["pendiente", "en_progreso", "esperando_respuesta", "completada"]).optional(),
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
        status: z.enum(["pendiente", "en_progreso", "esperando_respuesta", "completada"]).optional(),
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
    bulkDelete: adminProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ input }) => {
        await db.deleteManySubscribers(input.ids);
        return { deleted: input.ids.length };
      }),
    bulkUpdateStatus: adminProcedure
      .input(z.object({ ids: z.array(z.number()), isActive: z.boolean() }))
      .mutation(async ({ input }) => {
        await db.updateManySubscribersStatus(input.ids, input.isActive);
        return { updated: input.ids.length };
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
    send: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        // Obtener el newsletter
        const newsletter = await db.getNewsletterById(input.id);
        if (!newsletter) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Newsletter no encontrado' });
        }
        if (newsletter.status === 'sent') {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Este newsletter ya fue enviado' });
        }
        
        // Obtener suscriptores activos
        const subscribers = await db.getAllSubscribers({ isActive: true });
        if (!subscribers || subscribers.length === 0) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'No hay suscriptores activos' });
        }
        
        const emails = subscribers.map(s => s.email).filter((e): e is string => !!e);
        if (emails.length === 0) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'No hay emails válidos' });
        }
        
        // Crear HTML del newsletter
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #368A45 0%, #2D6E39 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">The Truck Savers</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="white-space: pre-wrap;">${newsletter.content}</div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                The Truck Savers - Taller mecánico de camiones y trailers<br>
                Houston, TX | Dallas, TX | Monterrey, NL
              </p>
            </div>
          </body>
          </html>
        `;
        
        // Enviar newsletter
        const result = await sendNewsletter({
          to: emails,
          subject: newsletter.subject,
          html,
        });
        
        // Actualizar estado del newsletter
        await db.updateNewsletter(input.id, {
          status: 'sent',
          sentAt: new Date(),
          recipientCount: result.sent,
        });
        
        return {
          success: result.success,
          sent: result.sent,
          failed: result.failed,
          errors: result.errors,
        };
      }),
    // Generar newsletter con IA
    generateWithAI: adminProcedure
      .input(z.object({
        prompt: z.string().min(10, "El prompt debe tener al menos 10 caracteres"),
        previousContent: z.string().optional(),
        editInstructions: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await generateNewsletterWithAI(input);
        return result;
      }),
    // Generar imagen para newsletter
    generateImage: adminProcedure
      .input(z.object({
        description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
      }))
      .mutation(async ({ input }) => {
        const imageUrl = await generateNewsletterImage(input.description);
        return { url: imageUrl };
      }),
    // Guardar newsletter generado por IA
    saveAIGenerated: adminProcedure
      .input(z.object({
        subject: z.string(),
        previewText: z.string().optional(),
        content: z.string(),
        htmlContent: z.string(),
        aiPrompt: z.string(),
        status: z.enum(["draft", "scheduled", "sending", "sent", "cancelled"]).default("draft"),
        scheduledAt: z.date().optional(),
        scheduledTimezone: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createNewsletter({
          subject: input.subject,
          content: input.content,
          status: input.status,
          scheduledAt: input.scheduledAt,
          createdBy: ctx.user.id,
        });
        return { success: true };
      }),
    // Obtener estadísticas de un newsletter
    getStats: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const newsletter = await db.getNewsletterById(input.id);
        if (!newsletter) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Newsletter no encontrado' });
        }
        const recipientCount = newsletter.recipientCount || 0;
        const openRate = recipientCount > 0 
          ? ((newsletter.openCount || 0) / recipientCount * 100).toFixed(1)
          : '0';
        const clickRate = recipientCount > 0
          ? ((newsletter.clickCount || 0) / recipientCount * 100).toFixed(1)
          : '0';
        return {
          ...newsletter,
          openRate: parseFloat(openRate),
          clickRate: parseFloat(clickRate),
        };
      }),
    // Bulk actions
    bulkDelete: adminProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ input }) => {
        for (const id of input.ids) {
          await db.deleteNewsletter(id);
        }
        return { success: true, deleted: input.ids.length };
      }),
    bulkDuplicate: adminProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ input, ctx }) => {
        const duplicated = [];
        for (const id of input.ids) {
          const original = await db.getNewsletterById(id);
          if (original) {
            await db.createNewsletter({
              subject: `${original.subject} (copia)`,
              content: original.content,
              status: 'draft',
              createdBy: ctx.user.id,
            });
            duplicated.push(id);
          }
        }
        return { success: true, duplicated };
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
  // ROADMAP
  // ============================================
  roadmap: router({
    stages: router({
      list: protectedProcedure.query(async () => {
        return db.getAllRoadmapStages();
      }),
      create: adminProcedure
        .input(z.object({
          name: z.string(),
          description: z.string().optional(),
          sortOrder: z.number().optional(),
          color: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
          await db.createRoadmapStage(input);
          return { success: true };
        }),
      update: adminProcedure
        .input(z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          sortOrder: z.number().optional(),
          color: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await db.updateRoadmapStage(id, data);
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await db.deleteRoadmapStage(input.id);
          return { success: true };
        }),
    }),
    deliverables: router({
      list: protectedProcedure.query(async () => {
        return db.getAllRoadmapDeliverables();
      }),
      byStage: protectedProcedure
        .input(z.object({ stageId: z.number() }))
        .query(async ({ input }) => {
          return db.getDeliverablesByStage(input.stageId);
        }),
      create: adminProcedure
        .input(z.object({
          stageId: z.number(),
          name: z.string(),
          description: z.string().optional(),
          status: z.enum(["pendiente", "en_progreso", "completado"]).optional(),
          sortOrder: z.number().optional(),
        }))
        .mutation(async ({ input }) => {
          await db.createRoadmapDeliverable(input);
          return { success: true };
        }),
      update: protectedProcedure
        .input(z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          status: z.enum(["pendiente", "en_progreso", "completado"]).optional(),
          sortOrder: z.number().optional(),
        }))
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          if (data.status === 'completado') {
            await db.updateRoadmapDeliverable(id, { ...data, completedAt: new Date() });
          } else {
            await db.updateRoadmapDeliverable(id, data);
          }
          return { success: true };
        }),
      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await db.deleteRoadmapDeliverable(input.id);
          return { success: true };
        }),
    }),
    stats: protectedProcedure.query(async () => {
      return db.getRoadmapStats();
    }),
  }),

  // ============================================
  // DASHBOARD STATS
  // ============================================
  dashboard: router({
    stats: protectedProcedure.query(async () => {
      const [taskStats, subscriberStats, objectives, tasks, seoStats, roadmapStats] = await Promise.all([
        db.getTaskStats(),
        db.getSubscriberStats(),
        db.getAllObjectives(),
        db.getAllTasks(),
        db.getSeoChecklistStats(),
        db.getRoadmapStats(),
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
        seo: seoStats,
        roadmap: roadmapStats,
      };
    }),
  }),

  // ============================================
  // VOICE TRANSCRIPTION
  // ============================================
  voice: router({
    transcribe: protectedProcedure
      .input(z.object({
        audioUrl: z.string(),
        language: z.string().optional(),
        prompt: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await transcribeAudio(input);
        if ('error' in result) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: result.error,
          });
        }
        return result;
      }),
    uploadAudio: protectedProcedure
      .input(z.object({
        audioBase64: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.audioBase64, 'base64');
        const extension = input.mimeType.split('/')[1] || 'webm';
        const filename = `voice/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
        const { url } = await storagePut(filename, buffer, input.mimeType);
        return { url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
