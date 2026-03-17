import { serialize, parse } from 'cookie';
import crypto from 'node:crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

export interface Session {
    username: string;
    createdAt: number;
}

const sessions = new Map<string, Session>();

// Clean expired sessions periodically (every 30 minutes)
setInterval(() => {
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    for (const [id, session] of sessions) {
        if (now - session.createdAt > maxAge) {
            sessions.delete(id);
        }
    }
}, 30 * 60 * 1000);

/**
 * Verify login credentials using constant-time comparison
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
    if (!ADMIN_PASSWORD) {
        console.error('ADMIN_PASSWORD not set in environment variables');
        return false;
    }

    const usernameMatch = username === ADMIN_USERNAME;

    // Constant-time comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password);
    const storedBuffer = Buffer.from(ADMIN_PASSWORD);

    let passwordMatch: boolean;
    if (passwordBuffer.length !== storedBuffer.length) {
        // Compare against itself to maintain constant time, but result is false
        crypto.timingSafeEqual(passwordBuffer, passwordBuffer);
        passwordMatch = false;
    } else {
        passwordMatch = crypto.timingSafeEqual(passwordBuffer, storedBuffer);
    }

    return usernameMatch && passwordMatch;
}

/**
 * Create a new session
 */
export function createSession(username: string): string {
    const sessionId = generateSessionId();
    sessions.set(sessionId, {
        username,
        createdAt: Date.now()
    });
    return sessionId;
}

/**
 * Get session by ID
 */
export function getSession(sessionId: string): Session | undefined {
    const session = sessions.get(sessionId);
    if (!session) return undefined;

    // Check session expiry (7 days)
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.createdAt > maxAge) {
        sessions.delete(sessionId);
        return undefined;
    }

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
