// import bcrypt from 'bcrypt';
import { serialize, parse } from 'cookie';

const ADMIN_USERNAME = 'admin';
// TODO: Change this password to a secure one!
// let ADMIN_PASSWORD_HASH = '';

// async function getAdminHash() {
//     if (!ADMIN_PASSWORD_HASH) {
//         ADMIN_PASSWORD_HASH = await bcrypt.hash('admin123', 10);
//     }
//     return ADMIN_PASSWORD_HASH;
// }

const SESSION_SECRET = 'atelier-kl-secret-key-change-me-in-production';

export interface Session {
    username: string;
    createdAt: number;
}

const sessions = new Map<string, Session>();

/**
 * Verify login credentials
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
    if (username !== ADMIN_USERNAME) {
        return false;
    }
    // Temporary bypass bcrypt for debugging
    return password === 'asdmin123';
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
    return sessions.get(sessionId);
}

/**
 * Delete session
 */
export function deleteSession(sessionId: string): void {
    sessions.delete(sessionId);
}

/**
 * Generate a random session ID
 */
function generateSessionId(): string {
    return Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
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
