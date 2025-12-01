import type { APIContext } from 'astro';
import { getSessionFromCookies } from './lib/auth';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute
const API_RATE_LIMIT_MAX = 20; // 20 API requests per minute

/**
 * Get client IP from request headers
 */
function getClientIP(request: Request): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
           request.headers.get('x-real-ip') ||
           'unknown';
}

/**
 * Check rate limit for a given IP
 */
function checkRateLimit(ip: string, maxRequests: number): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Security headers for all responses
 */
function addSecurityHeaders(response: Response): Response {
    const headers = new Headers(response.headers);

    // Prevent clickjacking
    headers.set('X-Frame-Options', 'SAMEORIGIN');

    // Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // XSS Protection (legacy browsers)
    headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Content Security Policy
    headers.set('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self'; " +
        "frame-ancestors 'self';"
    );

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}

export async function onRequest(context: APIContext, next: () => Promise<Response>) {
    const { url, redirect, request } = context;
    const clientIP = getClientIP(request);

    // Apply stricter rate limiting for API endpoints
    const isApiRoute = url.pathname.startsWith('/api/');
    const maxRequests = isApiRoute ? API_RATE_LIMIT_MAX : RATE_LIMIT_MAX_REQUESTS;

    const rateLimit = checkRateLimit(clientIP, maxRequests);

    if (!rateLimit.allowed) {
        return new Response(JSON.stringify({ error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' }), {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Retry-After': '60'
            }
        });
    }

    // Check if the request is for an admin page
    if (url.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (url.pathname === '/admin/login') {
            const response = await next();
            return addSecurityHeaders(response);
        }

        // Check for valid session
        const cookieHeader = request.headers.get('cookie');
        const session = getSessionFromCookies(cookieHeader);

        if (!session) {
            // Redirect to login if not authenticated
            return redirect('/admin/login');
        }
    }

    const response = await next();
    return addSecurityHeaders(response);
}
