import { eq, like, desc, and, or, sql, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  businessLines, InsertBusinessLine,
  locations, InsertLocation,
  objectives, InsertObjective,
  taskCategories, InsertTaskCategory,
  tasks, InsertTask,
  subscribers, InsertSubscriber,
  newsletters, InsertNewsletter,
  newsletterSends, InsertNewsletterSend,
  cmsModules, InsertCmsModule,
  userModulePermissions, InsertUserModulePermission,
  seoChecklist, InsertSeoChecklistItem,
  roadmapStages, InsertRoadmapStage,
  roadmapDeliverables, InsertRoadmapDeliverable,
  authTokens, InsertAuthToken,
  auditLogs, InsertAuditLog,
  courseWaitlist, InsertCourseWaitlistEntry,
  bailadaReports, InsertBailadaReport
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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

// ============================================
// USER FUNCTIONS
// ============================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

export async function createUser(data: { email: string; name?: string; role: "user" | "admin" }) {
  const db = await getDb();
  if (!db) return;
  
  // Generate a unique openId for manually created users
  const openId = `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await db.insert(users).values({
    openId,
    email: data.email,
    name: data.name || null,
    role: data.role,
    loginMethod: 'manual',
  });
}

export async function deleteUser(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserPassword(userId: number, passwordHash: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ passwordHash, loginMethod: 'local' }).where(eq(users.id, userId));
}

export async function updateUserLastSignedIn(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, userId));
}

export async function createUserWithPassword(data: { 
  email: string; 
  name?: string; 
  passwordHash: string;
  role: "user" | "admin" 
}) {
  const db = await getDb();
  if (!db) return;
  
  // Generate a unique openId based on email
  const openId = `local_${data.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  await db.insert(users).values({
    openId,
    email: data.email,
    name: data.name || null,
    passwordHash: data.passwordHash,
    role: data.role,
    loginMethod: 'local',
    isActive: true,
  });
}

export async function updateUserStatus(userId: number, isActive: boolean) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ isActive }).where(eq(users.id, userId));
}

// ============================================
// BUSINESS LINES FUNCTIONS
// ============================================

export async function getAllBusinessLines() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(businessLines).orderBy(businessLines.name);
}

export async function createBusinessLine(data: InsertBusinessLine) {
  const db = await getDb();
  if (!db) return;
  await db.insert(businessLines).values(data);
}

// ============================================
// LOCATIONS FUNCTIONS
// ============================================

export async function getAllLocations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(locations).orderBy(locations.name);
}

export async function createLocation(data: InsertLocation) {
  const db = await getDb();
  if (!db) return;
  await db.insert(locations).values(data);
}

// ============================================
// TASK CATEGORIES FUNCTIONS
// ============================================

export async function getAllTaskCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(taskCategories).orderBy(taskCategories.name);
}

export async function createTaskCategory(data: InsertTaskCategory) {
  const db = await getDb();
  if (!db) return;
  await db.insert(taskCategories).values(data);
}

// ============================================
// OBJECTIVES FUNCTIONS
// ============================================

export async function getAllObjectives() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(objectives).orderBy(desc(objectives.createdAt));
}

export async function getObjectiveById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(objectives).where(eq(objectives.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createObjective(data: InsertObjective) {
  const db = await getDb();
  if (!db) return;
  await db.insert(objectives).values(data);
}

export async function updateObjective(id: number, data: Partial<InsertObjective>) {
  const db = await getDb();
  if (!db) return;
  await db.update(objectives).set(data).where(eq(objectives.id, id));
}

export async function deleteObjective(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(objectives).where(eq(objectives.id, id));
}

// ============================================
// TASKS FUNCTIONS
// ============================================

export async function getAllTasks(filters?: { 
  status?: string; 
  priority?: string; 
  categoryId?: number;
  businessLineId?: number;
  locationId?: number;
}) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(tasks);
  
  const conditions = [];
  if (filters?.status) {
    conditions.push(eq(tasks.status, filters.status as any));
  }
  if (filters?.priority) {
    conditions.push(eq(tasks.priority, filters.priority as any));
  }
  if (filters?.categoryId) {
    conditions.push(eq(tasks.categoryId, filters.categoryId));
  }
  if (filters?.businessLineId) {
    conditions.push(eq(tasks.businessLineId, filters.businessLineId));
  }
  if (filters?.locationId) {
    conditions.push(eq(tasks.locationId, filters.locationId));
  }
  
  if (conditions.length > 0) {
    return db.select().from(tasks).where(and(...conditions)).orderBy(desc(tasks.createdAt));
  }
  
  return db.select().from(tasks).orderBy(desc(tasks.createdAt));
}

export async function getTaskById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTask(data: InsertTask) {
  const db = await getDb();
  if (!db) return;
  await db.insert(tasks).values(data);
}

export async function updateTask(id: number, data: Partial<InsertTask>) {
  const db = await getDb();
  if (!db) return;
  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(tasks).where(eq(tasks.id, id));
}

export async function getTaskStats() {
  const db = await getDb();
  if (!db) return { total: 0, pendiente: 0, en_progreso: 0, completada: 0, alta: 0, media: 0, baja: 0 };
  
  const allTasks = await db.select().from(tasks);
  
  return {
    total: allTasks.length,
    pendiente: allTasks.filter(t => t.status === 'pendiente').length,
    en_progreso: allTasks.filter(t => t.status === 'en_progreso').length,
    completada: allTasks.filter(t => t.status === 'completada').length,
    alta: allTasks.filter(t => t.priority === 'alta').length,
    media: allTasks.filter(t => t.priority === 'media').length,
    baja: allTasks.filter(t => t.priority === 'baja').length,
  };
}

// ============================================
// SUBSCRIBERS FUNCTIONS
// ============================================

export async function getAllSubscribers(filters?: { isActive?: boolean; search?: string }) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  if (filters?.isActive !== undefined) {
    conditions.push(eq(subscribers.isActive, filters.isActive));
  }
  if (filters?.search) {
    conditions.push(
      or(
        like(subscribers.email, `%${filters.search}%`),
        like(subscribers.name, `%${filters.search}%`),
        like(subscribers.company, `%${filters.search}%`)
      )
    );
  }
  
  if (conditions.length > 0) {
    return db.select().from(subscribers).where(and(...conditions)).orderBy(desc(subscribers.subscribedAt));
  }
  
  return db.select().from(subscribers).orderBy(desc(subscribers.subscribedAt));
}

export async function getSubscriberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subscribers).where(eq(subscribers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscriber(data: InsertSubscriber) {
  const db = await getDb();
  if (!db) return;
  await db.insert(subscribers).values(data);
}

export async function createManySubscribers(data: InsertSubscriber[]) {
  const db = await getDb();
  if (!db) return;
  // Insert in batches to avoid issues
  for (const subscriber of data) {
    try {
      await db.insert(subscribers).values(subscriber).onDuplicateKeyUpdate({
        set: { 
          name: subscriber.name,
          phone: subscriber.phone,
          company: subscriber.company,
          location: subscriber.location,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      console.error(`Failed to insert subscriber ${subscriber.email}:`, error);
    }
  }
}

export async function updateSubscriber(id: number, data: Partial<InsertSubscriber>) {
  const db = await getDb();
  if (!db) return;
  await db.update(subscribers).set(data).where(eq(subscribers.id, id));
}

export async function deleteSubscriber(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(subscribers).where(eq(subscribers.id, id));
}

export async function getSubscriberStats() {
  const db = await getDb();
  if (!db) return { total: 0, active: 0, inactive: 0 };
  
  const allSubscribers = await db.select().from(subscribers);
  
  return {
    total: allSubscribers.length,
    active: allSubscribers.filter(s => s.isActive).length,
    inactive: allSubscribers.filter(s => !s.isActive).length,
  };
}

// ============================================
// NEWSLETTERS FUNCTIONS
// ============================================

export async function getAllNewsletters() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
}

export async function getNewsletterById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(newsletters).where(eq(newsletters.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createNewsletter(data: InsertNewsletter) {
  const db = await getDb();
  if (!db) return;
  await db.insert(newsletters).values(data);
}

export async function updateNewsletter(id: number, data: Partial<InsertNewsletter>) {
  const db = await getDb();
  if (!db) return;
  await db.update(newsletters).set(data).where(eq(newsletters.id, id));
}

export async function deleteNewsletter(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(newsletters).where(eq(newsletters.id, id));
}

// ============================================
// CMS MODULES FUNCTIONS
// ============================================

export async function getAllCmsModules() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cmsModules).where(eq(cmsModules.isActive, true)).orderBy(cmsModules.sortOrder);
}

export async function createCmsModule(data: InsertCmsModule) {
  const db = await getDb();
  if (!db) return;
  await db.insert(cmsModules).values(data);
}

// ============================================
// USER MODULE PERMISSIONS FUNCTIONS
// ============================================

export async function getUserModulePermissions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userModulePermissions).where(eq(userModulePermissions.userId, userId));
}

export async function setUserModulePermission(data: InsertUserModulePermission) {
  const db = await getDb();
  if (!db) return;
  
  // Check if permission exists
  const existing = await db.select().from(userModulePermissions)
    .where(and(
      eq(userModulePermissions.userId, data.userId),
      eq(userModulePermissions.moduleId, data.moduleId)
    )).limit(1);
  
  if (existing.length > 0) {
    await db.update(userModulePermissions)
      .set(data)
      .where(eq(userModulePermissions.id, existing[0].id));
  } else {
    await db.insert(userModulePermissions).values(data);
  }
}

// ============================================
// SEO CHECKLIST FUNCTIONS
// ============================================

export async function getAllSeoChecklist() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seoChecklist).orderBy(seoChecklist.area, seoChecklist.id);
}

export async function updateSeoChecklistItem(id: number, data: Partial<InsertSeoChecklistItem>) {
  const db = await getDb();
  if (!db) return;
  await db.update(seoChecklist).set(data).where(eq(seoChecklist.id, id));
}

export async function createSeoChecklistItem(data: InsertSeoChecklistItem) {
  const db = await getDb();
  if (!db) return;
  await db.insert(seoChecklist).values(data);
}


// ============================================
// ROADMAP FUNCTIONS
// ============================================

export async function getAllRoadmapStages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roadmapStages).orderBy(roadmapStages.sortOrder);
}

export async function createRoadmapStage(data: InsertRoadmapStage) {
  const db = await getDb();
  if (!db) return;
  await db.insert(roadmapStages).values(data);
}

export async function updateRoadmapStage(id: number, data: Partial<InsertRoadmapStage>) {
  const db = await getDb();
  if (!db) return;
  await db.update(roadmapStages).set(data).where(eq(roadmapStages.id, id));
}

export async function deleteRoadmapStage(id: number) {
  const db = await getDb();
  if (!db) return;
  // Delete all deliverables first
  await db.delete(roadmapDeliverables).where(eq(roadmapDeliverables.stageId, id));
  await db.delete(roadmapStages).where(eq(roadmapStages.id, id));
}

export async function getAllRoadmapDeliverables() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roadmapDeliverables).orderBy(roadmapDeliverables.stageId, roadmapDeliverables.sortOrder);
}

export async function getDeliverablesByStage(stageId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roadmapDeliverables).where(eq(roadmapDeliverables.stageId, stageId)).orderBy(roadmapDeliverables.sortOrder);
}

export async function createRoadmapDeliverable(data: InsertRoadmapDeliverable) {
  const db = await getDb();
  if (!db) return;
  await db.insert(roadmapDeliverables).values(data);
}

export async function updateRoadmapDeliverable(id: number, data: Partial<InsertRoadmapDeliverable>) {
  const db = await getDb();
  if (!db) return;
  await db.update(roadmapDeliverables).set(data).where(eq(roadmapDeliverables.id, id));
}

export async function deleteRoadmapDeliverable(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(roadmapDeliverables).where(eq(roadmapDeliverables.id, id));
}

export async function getSeoChecklistStats() {
  const db = await getDb();
  if (!db) return { total: 0, completado: 0, pendiente: 0, en_progreso: 0 };
  
  const allItems = await db.select().from(seoChecklist);
  
  return {
    total: allItems.length,
    completado: allItems.filter(i => i.status === 'completado').length,
    pendiente: allItems.filter(i => i.status === 'pendiente').length,
    en_progreso: allItems.filter(i => i.status === 'en_progreso').length,
  };
}

export async function getRoadmapStats() {
  const db = await getDb();
  if (!db) return { totalStages: 0, totalDeliverables: 0, completedDeliverables: 0 };
  
  const stages = await db.select().from(roadmapStages);
  const deliverables = await db.select().from(roadmapDeliverables);
  
  return {
    totalStages: stages.length,
    totalDeliverables: deliverables.length,
    completedDeliverables: deliverables.filter(d => d.status === 'completado').length,
  };
}

// Bulk operations for subscribers
export async function deleteManySubscribers(ids: number[]) {
  const db = await getDb();
  if (!db || ids.length === 0) return;
  await db.delete(subscribers).where(inArray(subscribers.id, ids));
}

export async function updateManySubscribersStatus(ids: number[], isActive: boolean) {
  const db = await getDb();
  if (!db || ids.length === 0) return;
  await db.update(subscribers).set({ isActive }).where(inArray(subscribers.id, ids));
}


// ============================================
// AUTH TOKENS FUNCTIONS
// ============================================

export async function createAuthToken(data: InsertAuthToken) {
  const db = await getDb();
  if (!db) return;
  await db.insert(authTokens).values(data);
}

export async function getAuthToken(token: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(authTokens).where(eq(authTokens.token, token)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function markTokenAsUsed(tokenId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(authTokens).set({ usedAt: new Date() }).where(eq(authTokens.id, tokenId));
}

export async function deleteExpiredTokens() {
  const db = await getDb();
  if (!db) return;
  await db.delete(authTokens).where(sql`${authTokens.expiresAt} < NOW()`);
}

export async function deleteUserTokens(userId: number, type?: "invitation" | "password_reset") {
  const db = await getDb();
  if (!db) return;
  if (type) {
    await db.delete(authTokens).where(and(eq(authTokens.userId, userId), eq(authTokens.type, type)));
  } else {
    await db.delete(authTokens).where(eq(authTokens.userId, userId));
  }
}

// ============================================
// AUDIT LOG FUNCTIONS
// ============================================

export async function createAuditLog(data: InsertAuditLog) {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values(data);
}

export async function getAuditLogs(filters?: { userId?: number; action?: string; limit?: number }) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  if (filters?.userId) {
    conditions.push(eq(auditLogs.userId, filters.userId));
  }
  if (filters?.action) {
    conditions.push(eq(auditLogs.action, filters.action as any));
  }
  
  const limit = filters?.limit || 100;
  
  if (conditions.length > 0) {
    return db.select().from(auditLogs).where(and(...conditions)).orderBy(desc(auditLogs.createdAt)).limit(limit);
  }
  
  return db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit);
}

// ============================================
// USER SECURITY FUNCTIONS
// ============================================

export async function incrementFailedLoginAttempts(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    failedLoginAttempts: sql`${users.failedLoginAttempts} + 1` 
  }).where(eq(users.id, userId));
}

export async function resetFailedLoginAttempts(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    failedLoginAttempts: 0,
    lockedUntil: null
  }).where(eq(users.id, userId));
}

export async function lockUserAccount(userId: number, lockDurationMinutes: number = 15) {
  const db = await getDb();
  if (!db) return;
  const lockedUntil = new Date(Date.now() + lockDurationMinutes * 60 * 1000);
  await db.update(users).set({ lockedUntil }).where(eq(users.id, userId));
}

export async function unlockUserAccount(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    lockedUntil: null,
    failedLoginAttempts: 0
  }).where(eq(users.id, userId));
}

export async function incrementSessionVersion(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    sessionVersion: sql`${users.sessionVersion} + 1` 
  }).where(eq(users.id, userId));
}

export async function updateUserPasswordAndIncrementSession(userId: number, passwordHash: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    passwordHash, 
    loginMethod: 'local',
    sessionVersion: sql`${users.sessionVersion} + 1`
  }).where(eq(users.id, userId));
}


// ============================================
// COURSE WAITLIST FUNCTIONS
// ============================================

export async function getAllCourseWaitlistEntries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courseWaitlist).orderBy(desc(courseWaitlist.createdAt));
}

export async function createCourseWaitlistEntry(data: InsertCourseWaitlistEntry) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(courseWaitlist).values(data);
  return result;
}

export async function getCourseWaitlistEntryByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const results = await db.select().from(courseWaitlist).where(eq(courseWaitlist.email, email));
  return results[0] || null;
}

export async function updateCourseWaitlistEntry(id: number, data: Partial<InsertCourseWaitlistEntry>) {
  const db = await getDb();
  if (!db) return;
  await db.update(courseWaitlist).set(data).where(eq(courseWaitlist.id, id));
}

export async function deleteCourseWaitlistEntry(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(courseWaitlist).where(eq(courseWaitlist.id, id));
}


// ============================================
// BAILADA REPORTS FUNCTIONS
// ============================================

export async function getAllBailadaReports(filters?: {
  location?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  
  if (filters?.location) {
    conditions.push(eq(bailadaReports.location, filters.location as any));
  }
  if (filters?.startDate) {
    conditions.push(sql`${bailadaReports.date} >= ${filters.startDate}`);
  }
  if (filters?.endDate) {
    conditions.push(sql`${bailadaReports.date} <= ${filters.endDate}`);
  }
  
  if (conditions.length > 0) {
    return db.select().from(bailadaReports).where(and(...conditions)).orderBy(desc(bailadaReports.date));
  }
  
  return db.select().from(bailadaReports).orderBy(desc(bailadaReports.date));
}

export async function getBailadaReportById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bailadaReports).where(eq(bailadaReports.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBailadaReport(data: InsertBailadaReport) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(bailadaReports).values(data);
  return result;
}

export async function updateBailadaReport(id: number, data: Partial<InsertBailadaReport>) {
  const db = await getDb();
  if (!db) return;
  await db.update(bailadaReports).set(data).where(eq(bailadaReports.id, id));
}

export async function deleteBailadaReport(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(bailadaReports).where(eq(bailadaReports.id, id));
}

export async function getBailadaReportsStats(filters?: {
  location?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) return {
    totalReports: 0,
    totalClosures: 0,
    effectivenessRate: 0,
    totalQuoted: 0,
    totalAuthorized: 0,
    conversionRate: 0,
  };
  
  const conditions = [];
  
  if (filters?.location) {
    conditions.push(eq(bailadaReports.location, filters.location as any));
  }
  if (filters?.startDate) {
    conditions.push(sql`${bailadaReports.date} >= ${filters.startDate}`);
  }
  if (filters?.endDate) {
    conditions.push(sql`${bailadaReports.date} <= ${filters.endDate}`);
  }
  
  let reports;
  if (conditions.length > 0) {
    reports = await db.select().from(bailadaReports).where(and(...conditions));
  } else {
    reports = await db.select().from(bailadaReports);
  }
  
  const totalReports = reports.length;
  const totalClosures = reports.filter(r => r.saleClosure === 'si' || r.saleClosure === 'parcialmente').length;
  const effectivenessRate = totalReports > 0 ? (totalClosures / totalReports) * 100 : 0;
  const totalQuoted = reports.reduce((sum, r) => sum + (r.quoteAmount || 0), 0);
  const totalAuthorized = reports.reduce((sum, r) => sum + (r.authorizedAmount || 0), 0);
  const conversionRate = totalQuoted > 0 ? (totalAuthorized / totalQuoted) * 100 : 0;
  
  return {
    totalReports,
    totalClosures,
    effectivenessRate: Math.round(effectivenessRate * 100) / 100,
    totalQuoted,
    totalAuthorized,
    conversionRate: Math.round(conversionRate * 100) / 100,
  };
}

// ============================================
// USER FUNCTIONS - EXTENDED FOR CX ASESOR
// ============================================

export async function updateUserWithLocation(userId: number, data: { 
  role?: "user" | "admin" | "cx_asesor"; 
  userLocation?: "houston" | "dallas" | "monterrey" | null;
  name?: string;
  isActive?: boolean;
}) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.id, userId));
}

export async function createUserWithLocation(data: { 
  email: string; 
  name?: string; 
  passwordHash?: string;
  role: "user" | "admin" | "cx_asesor";
  userLocation?: "houston" | "dallas" | "monterrey";
}) {
  const db = await getDb();
  if (!db) return;
  
  const openId = `local_${data.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  await db.insert(users).values({
    openId,
    email: data.email,
    name: data.name || null,
    passwordHash: data.passwordHash || null,
    role: data.role,
    userLocation: data.userLocation || null,
    loginMethod: data.passwordHash ? 'local' : 'manual',
    isActive: true,
  });
}
