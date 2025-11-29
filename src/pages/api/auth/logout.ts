import type { APIRoute } from 'astro';
import { deleteSession, getSessionFromCookies, deleteSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
    const cookieHeader = request.headers.get('cookie');
    const session = getSessionFromCookies(cookieHeader);

    if (session) {
        // Find and delete the session
        const cookies = cookieHeader?.split(';').map(c => c.trim()) || [];
        const sessionCookie = cookies.find(c => c.startsWith('session='));
        if (sessionCookie) {
            const sessionId = sessionCookie.split('=')[1];
            deleteSession(sessionId);
        }
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': deleteSessionCookie()
        }
    });
};
