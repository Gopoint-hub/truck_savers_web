/**
 * Local authentication system with email/password
 * Replaces Manus OAuth for standalone deployment
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
// PASSWORD HASHING
// ============================================

/**
 * Hash a password using SHA-256 with salt
 * For production, consider using bcrypt or argon2
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

// ============================================
// SESSION MANAGEMENT
// ============================================

export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: string;
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

    const { userId, email, name, role } = payload as Record<string, unknown>;

    if (typeof userId !== 'number' || typeof role !== 'string') {
      return null;
    }

    return {
      userId,
      email: String(email || ''),
      name: String(name || ''),
      role,
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

  // Update last signed in
  await db.updateUserLastSignedIn(user.id);

  return user;
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
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        res.status(401).json({ error: "Usuario desactivado. Contacte al administrador." });
        return;
      }

      // Check if user has a password set
      if (!user.passwordHash) {
        res.status(401).json({ error: "Usuario no tiene contraseña configurada. Use el enlace de invitación." });
        return;
      }

      // Verify password
      if (!verifyPassword(password, user.passwordHash)) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      // Create session token
      const sessionToken = await createSessionToken(user);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      // Update last signed in
      await db.updateUserLastSignedIn(user.id);

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

  // Set password endpoint (for first-time setup or password reset)
  app.post("/api/auth/set-password", async (req: Request, res: Response) => {
    try {
      const { email, password, token } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son requeridos" });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
        return;
      }

      // Find user by email
      const user = await db.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      // Hash and save password
      const passwordHash = hashPassword(password);
      await db.updateUserPassword(user.id, passwordHash);

      // Create session token and log in
      const sessionToken = await createSessionToken(user);
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        message: "Contraseña configurada correctamente",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[LocalAuth] Set password error:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
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

  // Create first admin user (only works if no users exist)
  app.post("/api/auth/setup", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son requeridos" });
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
