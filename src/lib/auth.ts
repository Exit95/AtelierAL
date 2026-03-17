import { serialize, parse } from 'cookie';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

export interface Session {
    username: string;
    createdAt: number;
    lastActivity: number;
}

// ── Session Storage (in-memory with DB fallback planned) ──────────
const sessions = new Map<string, Session>();

// Clean expired sessions periodically (every 15 minutes)
setInterval(() => {
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    const idleTimeout = 30 * 60 * 1000; // 30 minutes idle
    for (const [id, session] of sessions) {
        if (now - session.createdAt > maxAge || now - session.lastActivity > idleTimeout) {
            sessions.delete(id);
        }
    }
}, 15 * 60 * 1000);

// ── Rate Limiting ─────────────────────────────────────────────────
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const attempt = loginAttempts.get(ip);

    if (!attempt) return true;

    if (now - attempt.firstAttempt > WINDOW_MS) {
        loginAttempts.delete(ip);
        return true;
    }

    return attempt.count < MAX_ATTEMPTS;
}

function recordLoginAttempt(ip: string): void {
    const now = Date.now();
    const attempt = loginAttempts.get(ip);

    if (!attempt || now - attempt.firstAttempt > WINDOW_MS) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now });
    } else {
        attempt.count++;
    }
}

function clearLoginAttempts(ip: string): void {
    loginAttempts.delete(ip);
}

// Clean old rate limit entries every 30 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, attempt] of loginAttempts) {
        if (now - attempt.firstAttempt > WINDOW_MS) {
            loginAttempts.delete(ip);
        }
    }
}, 30 * 60 * 1000);

/**
 * Verify login credentials using bcrypt hash comparison.
 * Falls back to constant-time plain-text comparison if no hash is set (with warning).
 */
export async function verifyCredentials(username: string, password: string, ip?: string): Promise<boolean> {
    // Rate limit check
    const clientIp = ip || 'unknown';
    if (!checkRateLimit(clientIp)) {
        console.warn(`Rate limit exceeded for IP: ${clientIp}`);
        return false;
    }

    recordLoginAttempt(clientIp);

    const usernameMatch = username === ADMIN_USERNAME;

    let passwordMatch = false;

    if (ADMIN_PASSWORD_HASH) {
        // Preferred: bcrypt hash comparison
        try {
            passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        } catch {
            console.error('bcrypt comparison failed');
            passwordMatch = false;
        }
    } else if (ADMIN_PASSWORD_PLAIN) {
        // Fallback: constant-time plain-text comparison (log warning)
        console.warn('WARNING: Using plain-text password. Set ADMIN_PASSWORD_HASH for production!');
        const passwordBuffer = Buffer.from(password);
        const storedBuffer = Buffer.from(ADMIN_PASSWORD_PLAIN);

        if (passwordBuffer.length !== storedBuffer.length) {
            crypto.timingSafeEqual(passwordBuffer, passwordBuffer);
            passwordMatch = false;
        } else {
            passwordMatch = crypto.timingSafeEqual(passwordBuffer, storedBuffer);
        }
    } else {
        console.error('No admin password configured (ADMIN_PASSWORD_HASH or ADMIN_PASSWORD)');
        return false;
    }

    const result = usernameMatch && passwordMatch;

    if (result) {
        clearLoginAttempts(clientIp);
    }

    return result;
}

/**
 * Generate a bcrypt hash for a password (utility for setup)
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

/**
 * Create a new session
 */
export function createSession(username: string): string {
    const sessionId = generateSessionId();
    const now = Date.now();
    sessions.set(sessionId, {
        username,
        createdAt: now,
        lastActivity: now,
    });
    return sessionId;
}

/**
 * Get session by ID (refreshes lastActivity on access)
 */
export function getSession(sessionId: string): Session | undefined {
    const session = sessions.get(sessionId);
    if (!session) return undefined;

    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const idleTimeout = 30 * 60 * 1000;

    if (now - session.createdAt > maxAge || now - session.lastActivity > idleTimeout) {
        sessions.delete(sessionId);
        return undefined;
    }

    // Refresh activity timestamp
    session.lastActivity = now;
    return session;
}

/**
 * Delete session
 */
export function deleteSession(sessionId: string): void {
    sessions.delete(sessionId);
}

/**
 * Generate a cryptographically secure session ID
 */
function generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Create session cookie
 */
export function createSessionCookie(sessionId: string): string {
    return serialize('session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
    });
}

/**
 * Parse session from cookies
 */
export function getSessionFromCookies(cookieHeader: string | null): Session | undefined {
    if (!cookieHeader) return undefined;

    const cookies = parse(cookieHeader);
    const sessionId = cookies.session;

    if (!sessionId) return undefined;

    return getSession(sessionId);
}

/**
 * Delete session cookie
 */
export function deleteSessionCookie(): string {
    return serialize('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
    });
}

/**
 * Check if rate limited (for use in API routes)
 */
export function isRateLimited(ip: string): boolean {
    return !checkRateLimit(ip);
}
