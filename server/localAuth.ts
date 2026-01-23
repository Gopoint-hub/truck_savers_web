/**
 * Local authentication system with email/password
 * Features:
 * - Password hashing with salt
 * - JWT session management with session versioning
 * - Token-based invitation and password reset
 * - Account lockout after failed attempts
 * - Audit logging
 */
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import * as db from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import type { User } from "../drizzle/schema";

// ============================================
// CONSTANTS
// ============================================

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION_MINUTES = 15;
const INVITATION_TOKEN_EXPIRY_HOURS = 24;
const PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 1;

// Password requirements
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REQUIRES_UPPERCASE = true;
const PASSWORD_REQUIRES_NUMBER = true;

// ============================================
// PASSWORD UTILITIES
// ============================================

/**
 * Validate password meets requirements
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, error: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres` };
  }
  if (PASSWORD_REQUIRES_UPPERCASE && !/[A-Z]/.test(password)) {
    return { valid: false, error: "La contraseña debe contener al menos una letra mayúscula" };
  }
  if (PASSWORD_REQUIRES_NUMBER && !/[0-9]/.test(password)) {
    return { valid: false, error: "La contraseña debe contener al menos un número" };
  }
  return { valid: true };
}

/**
 * Hash a password using SHA-256 with salt
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(salt + password)
    .digest('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  
  const inputHash = createHash('sha256')
    .update(salt + password)
    .digest('hex');
  
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));
  } catch {
    return false;
  }
}

/**
 * Generate a secure random token
 */
export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: string;
  sessionVersion: number;
};

function getSessionSecret() {
  const secret = ENV.cookieSecret;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: User): Promise<string> {
  const secretKey = getSessionSecret();
  const expiresInMs = ONE_YEAR_MS;
  const expirationSeconds = Math.floor((Date.now() + expiresInMs) / 1000);

  return new SignJWT({
    userId: user.id,
    email: user.email || '',
    name: user.name || '',
    role: user.role,
    sessionVersion: user.sessionVersion,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const secretKey = getSessionSecret();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const { userId, email, name, role, sessionVersion } = payload as Record<string, unknown>;

    if (typeof userId !== 'number' || typeof role !== 'string') {
      return null;
    }

    return {
      userId,
      email: String(email || ''),
      name: String(name || ''),
      role,
      sessionVersion: typeof sessionVersion === 'number' ? sessionVersion : 1,
    };
  } catch (error) {
    console.warn("[LocalAuth] Session verification failed:", error);
    return null;
  }
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

export async function authenticateRequest(req: Request): Promise<User | null> {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  // Parse cookies
  const cookies = new Map<string, string>();
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies.set(name, value);
    }
  });

  const sessionCookie = cookies.get(COOKIE_NAME);
  if (!sessionCookie) return null;

  const session = await verifySessionToken(sessionCookie);
  if (!session) return null;

  // Get user from database
  const user = await db.getUserById(session.userId);
  if (!user || !user.isActive) return null;

  // Check session version (invalidate if password was changed)
  if (user.sessionVersion !== session.sessionVersion) {
    return null;
  }

  // Update last signed in
  await db.updateUserLastSignedIn(user.id);

  return user;
}

// ============================================
// AUDIT LOGGING
// ============================================

async function logAudit(
  action: string,
  req: Request,
  userId?: number,
  details?: Record<string, unknown>
) {
  const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  await db.createAuditLog({
    userId: userId || null,
    action: action as any,
    details: details ? JSON.stringify(details) : null,
    ipAddress,
    userAgent,
  });
}

// ============================================
// AUTH ROUTES
// ============================================

export function registerLocalAuthRoutes(app: Express) {
  
  // Login endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son requeridos" });
        return;
      }

      // Find user by email
      const user = await db.getUserByEmail(email);
      if (!user) {
        await logAudit('login_failed', req, undefined, { email, reason: 'user_not_found' });
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      // Check if account is locked
      if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
        const remainingMinutes = Math.ceil((new Date(user.lockedUntil).getTime() - Date.now()) / 60000);
        await logAudit('login_failed', req, user.id, { reason: 'account_locked' });
        res.status(401).json({ 
          error: `Cuenta bloqueada. Intente nuevamente en ${remainingMinutes} minutos o use "Recuperar contraseña".` 
        });
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        await logAudit('login_failed', req, user.id, { reason: 'account_inactive' });
        res.status(401).json({ error: "Usuario desactivado. Contacte al administrador." });
        return;
      }

      // Check if user has a password set
      if (!user.passwordHash) {
        await logAudit('login_failed', req, user.id, { reason: 'no_password' });
        res.status(401).json({ error: "Usuario no tiene contraseña configurada. Revise su email para el enlace de invitación." });
        return;
      }

      // Verify password
      if (!verifyPassword(password, user.passwordHash)) {
        await db.incrementFailedLoginAttempts(user.id);
        const updatedUser = await db.getUserById(user.id);
        
        if (updatedUser && updatedUser.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
          await db.lockUserAccount(user.id, LOCKOUT_DURATION_MINUTES);
          await logAudit('account_locked', req, user.id, { 
            failedAttempts: updatedUser.failedLoginAttempts 
          });
          res.status(401).json({ 
            error: `Cuenta bloqueada por ${LOCKOUT_DURATION_MINUTES} minutos debido a múltiples intentos fallidos.` 
          });
          return;
        }
        
        await logAudit('login_failed', req, user.id, { 
          reason: 'invalid_password',
          failedAttempts: updatedUser?.failedLoginAttempts || 0
        });
        
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - (updatedUser?.failedLoginAttempts || 0);
        res.status(401).json({ 
          error: `Credenciales inválidas. ${remainingAttempts} intento(s) restante(s).` 
        });
        return;
      }

      // Reset failed login attempts on successful login
      await db.resetFailedLoginAttempts(user.id);

      // Create session token
      const sessionToken = await createSessionToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Update last signed in
      await db.updateUserLastSignedIn(user.id);
      
      await logAudit('login_success', req, user.id);

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[LocalAuth] Login error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Set password endpoint (for invitation acceptance)
  app.post("/api/auth/set-password", async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        res.status(400).json({ error: "Token y contraseña son requeridos" });
        return;
      }

      // Validate password
      const validation = validatePassword(password);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      // Find and validate token
      const authToken = await db.getAuthToken(token);
      if (!authToken) {
        res.status(400).json({ error: "Token inválido o expirado" });
        return;
      }

      if (authToken.usedAt) {
        res.status(400).json({ error: "Este enlace ya fue utilizado" });
        return;
      }

      if (new Date(authToken.expiresAt) < new Date()) {
        res.status(400).json({ error: "Este enlace ha expirado. Solicite uno nuevo." });
        return;
      }

      // Get user
      const user = await db.getUserById(authToken.userId);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      // Hash and save password (also increments session version)
      const passwordHash = hashPassword(password);
      await db.updateUserPasswordAndIncrementSession(user.id, passwordHash);
      
      // Mark token as used
      await db.markTokenAsUsed(authToken.id);

      // Log the action
      const auditAction = authToken.type === 'invitation' ? 'invitation_accepted' : 'password_reset_complete';
      await logAudit(auditAction, req, user.id);

      // Get updated user for session
      const updatedUser = await db.getUserById(user.id);
      if (!updatedUser) {
        res.status(500).json({ error: "Error al actualizar usuario" });
        return;
      }

      // Create session token and log in
      const sessionToken = await createSessionToken(updatedUser);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        message: "Contraseña configurada correctamente",
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
        },
      });
    } catch (error) {
      console.error("[LocalAuth] Set password error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Request password reset
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email es requerido" });
        return;
      }

      // Always return success to prevent email enumeration
      const successMessage = "Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.";

      // Find user by email
      const user = await db.getUserByEmail(email);
      if (!user) {
        // Don't reveal that user doesn't exist
        res.json({ success: true, message: successMessage });
        return;
      }

      // Delete any existing password reset tokens for this user
      await db.deleteUserTokens(user.id, 'password_reset');

      // Generate new token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

      await db.createAuthToken({
        userId: user.id,
        token,
        type: 'password_reset',
        expiresAt,
      });

      await logAudit('password_reset_request', req, user.id);

      // TODO: Send email with reset link
      // For now, we'll need to integrate with the email service
      const resetUrl = `${req.headers.origin}/cms/reset-password?token=${token}`;
      console.log(`[LocalAuth] Password reset URL for ${email}: ${resetUrl}`);

      // Import and send email
      const { sendPasswordResetEmail } = await import('./email');
      await sendPasswordResetEmail({
        to: user.email!,
        userName: user.name || user.email!,
        resetUrl,
        expiresInHours: PASSWORD_RESET_TOKEN_EXPIRY_HOURS,
      });

      res.json({ success: true, message: successMessage });
    } catch (error) {
      console.error("[LocalAuth] Forgot password error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Validate token (check if valid before showing password form)
  app.get("/api/auth/validate-token", async (req: Request, res: Response) => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== 'string') {
        res.status(400).json({ valid: false, error: "Token requerido" });
        return;
      }

      const authToken = await db.getAuthToken(token);
      if (!authToken) {
        res.json({ valid: false, error: "Token inválido" });
        return;
      }

      if (authToken.usedAt) {
        res.json({ valid: false, error: "Este enlace ya fue utilizado" });
        return;
      }

      if (new Date(authToken.expiresAt) < new Date()) {
        res.json({ valid: false, error: "Este enlace ha expirado" });
        return;
      }

      const user = await db.getUserById(authToken.userId);
      if (!user) {
        res.json({ valid: false, error: "Usuario no encontrado" });
        return;
      }

      res.json({ 
        valid: true, 
        type: authToken.type,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.error("[LocalAuth] Validate token error:", error);
      res.status(500).json({ valid: false, error: "Error interno del servidor" });
    }
  });

  // Change password (for logged-in users)
  app.post("/api/auth/change-password", async (req: Request, res: Response) => {
    try {
      const user = await authenticateRequest(req);
      if (!user) {
        res.status(401).json({ error: "No autenticado" });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: "Contraseña actual y nueva son requeridas" });
        return;
      }

      // Validate new password
      const validation = validatePassword(newPassword);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      // Verify current password
      if (!user.passwordHash || !verifyPassword(currentPassword, user.passwordHash)) {
        res.status(401).json({ error: "Contraseña actual incorrecta" });
        return;
      }

      // Hash and save new password (also increments session version)
      const passwordHash = hashPassword(newPassword);
      await db.updateUserPasswordAndIncrementSession(user.id, passwordHash);

      await logAudit('password_change', req, user.id);

      // Get updated user for new session
      const updatedUser = await db.getUserById(user.id);
      if (!updatedUser) {
        res.status(500).json({ error: "Error al actualizar usuario" });
        return;
      }

      // Create new session token (old sessions will be invalid due to version change)
      const sessionToken = await createSessionToken(updatedUser);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ 
        success: true, 
        message: "Contraseña actualizada correctamente. Todas las demás sesiones han sido cerradas." 
      });
    } catch (error) {
      console.error("[LocalAuth] Change password error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    const user = await authenticateRequest(req);
    if (user) {
      await logAudit('logout', req, user.id);
    }
    
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    res.json({ success: true });
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const user = await authenticateRequest(req);
    if (!user) {
      res.json({ user: null });
      return;
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  });

  // Create invitation token for a user (admin only)
  app.post("/api/auth/create-invitation", async (req: Request, res: Response) => {
    try {
      const currentUser = await authenticateRequest(req);
      if (!currentUser || currentUser.role !== 'admin') {
        res.status(403).json({ error: "Acceso denegado" });
        return;
      }

      const { userId } = req.body;
      if (!userId) {
        res.status(400).json({ error: "userId es requerido" });
        return;
      }

      const user = await db.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      if (!user.email) {
        res.status(400).json({ error: "El usuario no tiene email configurado" });
        return;
      }

      // Delete any existing invitation tokens
      await db.deleteUserTokens(userId, 'invitation');

      // Generate new token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + INVITATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

      await db.createAuthToken({
        userId,
        token,
        type: 'invitation',
        expiresAt,
      });

      await logAudit('invitation_sent', req, currentUser.id, { invitedUserId: userId });

      const invitationUrl = `${req.headers.origin}/cms/set-password?token=${token}`;

      // Send invitation email
      const { sendInvitationEmail } = await import('./email');
      await sendInvitationEmail({
        to: user.email,
        userName: user.name || user.email,
        inviterName: currentUser.name || 'Administrador',
        invitationUrl,
        expiresInHours: INVITATION_TOKEN_EXPIRY_HOURS,
      });

      res.json({ 
        success: true, 
        message: "Invitación enviada correctamente",
        invitationUrl, // For debugging, remove in production
      });
    } catch (error) {
      console.error("[LocalAuth] Create invitation error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Check if system needs initial setup (no users exist)
  app.get("/api/auth/needs-setup", async (req: Request, res: Response) => {
    try {
      const users = await db.getAllUsers();
      res.json({ needsSetup: users.length === 0 });
    } catch (error) {
      console.error("[LocalAuth] Needs setup check error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Create first admin user (only works if no users exist)
  app.post("/api/auth/setup", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son requeridos" });
        return;
      }

      // Validate password
      const validation = validatePassword(password);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      // Check if any users exist
      const existingUsers = await db.getAllUsers();
      if (existingUsers.length > 0) {
        res.status(403).json({ error: "El sistema ya está configurado" });
        return;
      }

      // Create first admin user
      const passwordHash = hashPassword(password);
      await db.createUserWithPassword({
        email,
        name: name || 'Administrador',
        passwordHash,
        role: 'admin',
      });

      const user = await db.getUserByEmail(email);
      if (!user) {
        res.status(500).json({ error: "Error al crear usuario" });
        return;
      }

      await logAudit('user_created', req, user.id, { isInitialSetup: true });

      // Create session and log in
      const sessionToken = await createSessionToken(user);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        message: "Administrador creado correctamente",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[LocalAuth] Setup error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
}
