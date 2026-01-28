import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Unique identifier for the user. Can be email-based for local auth or OAuth openId. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  /** Hashed password for local authentication */
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "cx_asesor"]).default("user").notNull(),
  /** Ubicación del usuario (para CX Asesores) */
  userLocation: mysqlEnum("userLocation", ["houston", "dallas", "monterrey"]),
  /** Whether the user account is active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Failed login attempts counter */
  failedLoginAttempts: int("failedLoginAttempts").default(0).notNull(),
  /** Timestamp when the account was locked */
  lockedUntil: timestamp("lockedUntil"),
  /** Session version - incremented when password changes to invalidate all sessions */
  sessionVersion: int("sessionVersion").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// CMS MODULES - PENDIENTES, METAS, OBJETIVOS
// ============================================

/**
 * Líneas de negocio (Servicios, APUs, E-commerce)
 */
export const businessLines = mysqlTable("business_lines", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BusinessLine = typeof businessLines.$inferSelect;
export type InsertBusinessLine = typeof businessLines.$inferInsert;

/**
 * Ubicaciones (Houston, Dallas, Monterrey)
 */
export const locations = mysqlTable("locations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }),
  country: varchar("country", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;

/**
 * Objetivos comerciales (metas mensuales por línea de negocio y ubicación)
 */
export const objectives = mysqlTable("objectives", {
  id: int("id").autoincrement().primaryKey(),
  businessLineId: int("businessLineId").references(() => businessLines.id),
  locationId: int("locationId").references(() => locations.id),
  serviceProduct: varchar("serviceProduct", { length: 200 }).notNull(),
  targetValue: varchar("targetValue", { length: 100 }).notNull(), // e.g., "150 / mes", "10 / mes"
  targetNumeric: int("targetNumeric"), // Valor numérico para cálculos
  period: mysqlEnum("period", ["daily", "weekly", "monthly", "quarterly", "yearly"]).default("monthly"),
  currentProgress: int("currentProgress").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Objective = typeof objectives.$inferSelect;
export type InsertObjective = typeof objectives.$inferInsert;

/**
 * Categorías de pendientes
 */
export const taskCategories = mysqlTable("task_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 20 }).default("#368A45"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TaskCategory = typeof taskCategories.$inferSelect;
export type InsertTaskCategory = typeof taskCategories.$inferInsert;

/**
 * Pendientes/Tareas de marketing
 */
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  businessLineId: int("businessLineId").references(() => businessLines.id),
  locationId: int("locationId").references(() => locations.id),
  objectiveId: int("objectiveId").references(() => objectives.id),
  categoryId: int("categoryId").references(() => taskCategories.id),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  priority: mysqlEnum("priority", ["alta", "media", "baja"]).default("media"),
  status: mysqlEnum("status", ["pendiente", "en_progreso", "esperando_respuesta", "completada"]).default("pendiente"),
  dueDate: timestamp("dueDate"),
  assignedTo: int("assignedTo").references(() => users.id),
  createdBy: int("createdBy").references(() => users.id),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

// ============================================
// CMS MODULES - NEWSLETTER Y SUSCRIPTORES
// ============================================

/**
 * Suscriptores/Clientes para newsletter
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 200 }),
  location: varchar("location", { length: 100 }),
  language: mysqlEnum("language", ["es", "en"]).default("es"),
  source: varchar("source", { length: 100 }), // Origen del suscriptor (web, importado, manual)
  tags: text("tags"), // Tags separados por coma
  isActive: boolean("isActive").default(true),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

/**
 * Clientes (base de datos de clientes del negocio)
 */
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 200 }),
  location: varchar("location", { length: 100 }),
  locationId: int("locationId").references(() => locations.id),
  businessLineId: int("businessLineId").references(() => businessLines.id),
  notes: text("notes"),
  tags: text("tags"), // Tags separados por coma
  isActive: boolean("isActive").default(true),
  lastServiceDate: timestamp("lastServiceDate"),
  totalServices: int("totalServices").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

/**
 * Campañas de newsletter
 */
export const newsletters = mysqlTable("newsletters", {
  id: int("id").autoincrement().primaryKey(),
  subject: varchar("subject", { length: 500 }).notNull(),
  previewText: varchar("previewText", { length: 200 }), // Texto de previsualización en bandeja
  content: text("content").notNull(), // Contenido en texto plano o markdown
  htmlContent: text("htmlContent"), // HTML renderizado del newsletter
  aiPrompt: text("aiPrompt"), // Prompt original usado para generar con IA
  status: mysqlEnum("status", ["draft", "scheduled", "sending", "sent", "cancelled"]).default("draft"),
  scheduledAt: timestamp("scheduledAt"),
  scheduledTimezone: varchar("scheduledTimezone", { length: 50 }).default("America/Chicago"), // Houston timezone
  sentAt: timestamp("sentAt"),
  recipientCount: int("recipientCount").default(0),
  deliveredCount: int("deliveredCount").default(0),
  openCount: int("openCount").default(0),
  clickCount: int("clickCount").default(0),
  bounceCount: int("bounceCount").default(0),
  unsubscribeCount: int("unsubscribeCount").default(0),
  createdBy: int("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = typeof newsletters.$inferInsert;

/**
 * Registro de envíos de newsletter
 */
export const newsletterSends = mysqlTable("newsletter_sends", {
  id: int("id").autoincrement().primaryKey(),
  newsletterId: int("newsletterId").references(() => newsletters.id).notNull(),
  subscriberId: int("subscriberId").references(() => subscribers.id).notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  openedAt: timestamp("openedAt"),
  clickedAt: timestamp("clickedAt"),
  status: mysqlEnum("status", ["sent", "delivered", "opened", "clicked", "bounced", "failed"]).default("sent"),
});

export type NewsletterSend = typeof newsletterSends.$inferSelect;
export type InsertNewsletterSend = typeof newsletterSends.$inferInsert;

/**
 * Tracking de clics en newsletters
 */
export const newsletterClicks = mysqlTable("newsletter_clicks", {
  id: int("id").autoincrement().primaryKey(),
  newsletterId: int("newsletterId").references(() => newsletters.id).notNull(),
  subscriberId: int("subscriberId").references(() => subscribers.id),
  linkUrl: text("linkUrl").notNull(),
  linkText: varchar("linkText", { length: 200 }),
  clickedAt: timestamp("clickedAt").defaultNow().notNull(),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
});

export type NewsletterClick = typeof newsletterClicks.$inferSelect;
export type InsertNewsletterClick = typeof newsletterClicks.$inferInsert;

// ============================================
// CMS MODULES - PERMISOS Y ACCESO
// ============================================

/**
 * Módulos del CMS
 */
export const cmsModules = mysqlTable("cms_modules", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  isActive: boolean("isActive").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CmsModule = typeof cmsModules.$inferSelect;
export type InsertCmsModule = typeof cmsModules.$inferInsert;

/**
 * Permisos de usuario por módulo
 */
export const userModulePermissions = mysqlTable("user_module_permissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  moduleId: int("moduleId").references(() => cmsModules.id).notNull(),
  canView: boolean("canView").default(true),
  canCreate: boolean("canCreate").default(false),
  canEdit: boolean("canEdit").default(false),
  canDelete: boolean("canDelete").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserModulePermission = typeof userModulePermissions.$inferSelect;
export type InsertUserModulePermission = typeof userModulePermissions.$inferInsert;

// ============================================
// CHECKLIST SEO (para tracking)
// ============================================

/**
 * Items del checklist SEO
 */
export const seoChecklist = mysqlTable("seo_checklist", {
  id: int("id").autoincrement().primaryKey(),
  area: varchar("area", { length: 100 }).notNull(),
  item: varchar("item", { length: 500 }).notNull(),
  status: mysqlEnum("status", ["pendiente", "en_progreso", "completado"]).default("pendiente"),
  notes: text("notes"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoChecklistItem = typeof seoChecklist.$inferSelect;
export type InsertSeoChecklistItem = typeof seoChecklist.$inferInsert;


// ============================================
// ROADMAP DEL PROYECTO
// ============================================

/**
 * Etapas del roadmap del proyecto
 */
export const roadmapStages = mysqlTable("roadmap_stages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  sortOrder: int("sortOrder").default(0),
  color: varchar("color", { length: 20 }).default("#368A45"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RoadmapStage = typeof roadmapStages.$inferSelect;
export type InsertRoadmapStage = typeof roadmapStages.$inferInsert;

/**
 * Entregables del roadmap
 */
export const roadmapDeliverables = mysqlTable("roadmap_deliverables", {
  id: int("id").autoincrement().primaryKey(),
  stageId: int("stageId").references(() => roadmapStages.id).notNull(),
  name: varchar("name", { length: 300 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["pendiente", "en_progreso", "completado"]).default("pendiente"),
  sortOrder: int("sortOrder").default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RoadmapDeliverable = typeof roadmapDeliverables.$inferSelect;
export type InsertRoadmapDeliverable = typeof roadmapDeliverables.$inferInsert;

// ============================================
// AUTHENTICATION TOKENS
// ============================================

/**
 * Tokens for password reset and user invitations
 */
export const authTokens = mysqlTable("auth_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  type: mysqlEnum("type", ["invitation", "password_reset"]).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuthToken = typeof authTokens.$inferSelect;
export type InsertAuthToken = typeof authTokens.$inferInsert;

// ============================================
// AUDIT LOG
// ============================================

/**
 * Audit log for security-related events
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  action: mysqlEnum("action", [
    "login_success",
    "login_failed",
    "logout",
    "password_change",
    "password_reset_request",
    "password_reset_complete",
    "invitation_sent",
    "invitation_accepted",
    "account_locked",
    "account_unlocked",
    "user_created",
    "user_updated",
    "user_deleted"
  ]).notNull(),
  details: text("details"), // JSON with additional details
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;


// ============================================
// LISTA DE ESPERA - CURSOS PRESENCIALES
// ============================================

/**
 * Lista de espera para cursos presenciales
 * Registra interesados que quieren ser notificados cuando haya cursos disponibles
 */
export const courseWaitlist = mysqlTable("course_waitlist", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(), // Número de WhatsApp
  city: varchar("city", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["pendiente", "contactado", "inscrito", "cancelado"]).default("pendiente"),
  notes: text("notes"),
  contactedAt: timestamp("contactedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseWaitlistEntry = typeof courseWaitlist.$inferSelect;
export type InsertCourseWaitlistEntry = typeof courseWaitlist.$inferInsert;


// ============================================
// REPORTE DE BAILADAS (Inspecciones comerciales)
// ============================================

/**
 * Reportes de inspecciones "La Bailada" con seguimiento comercial
 */
export const bailadaReports = mysqlTable("bailada_reports", {
  id: int("id").autoincrement().primaryKey(),
  /** Fecha y hora del reporte */
  date: timestamp("date").notNull(),
  /** Número de orden de trabajo */
  workOrderNumber: varchar("workOrderNumber", { length: 50 }).notNull(),
  /** Nombre del técnico que realizó la inspección */
  technician: varchar("technician", { length: 200 }).notNull(),
  /** ID del usuario que realizó la cotización */
  quotedBy: int("quotedBy").references(() => users.id).notNull(),
  /** Monto de la cotización en centavos (para evitar decimales) */
  quoteAmount: int("quoteAmount").notNull(),
  /** Cierre de venta */
  saleClosure: mysqlEnum("saleClosure", ["si", "no", "parcialmente"]).notNull(),
  /** Monto autorizado en centavos */
  authorizedAmount: int("authorizedAmount").default(0),
  /** Ubicación (Houston, Dallas, Monterrey) */
  location: mysqlEnum("location", ["houston", "dallas", "monterrey"]).notNull(),
  /** Objeción cuando saleClosure es "no" */
  objection: mysqlEnum("objection", [
    "no_tengo_dinero", 
    "no_tengo_tiempo", 
    "carga_programada_regreso_luego", 
    "otro"
  ]),
  /** Detalles adicionales de la objeción */
  objectionDetails: text("objectionDetails"),
  /** Razón cuando saleClosure es "parcialmente" */
  partialReason: mysqlEnum("partialReason", [
    "no_suficiente_dinero", 
    "solo_trabajos_seguridad", 
    "varias_etapas", 
    "solo_trabajo_original", 
    "otro"
  ]),
  /** Detalles adicionales de la razón parcial */
  partialDetails: text("partialDetails"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BailadaReport = typeof bailadaReports.$inferSelect;
export type InsertBailadaReport = typeof bailadaReports.$inferInsert;
