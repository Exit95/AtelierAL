import type { APIContext } from 'astro';
import { getSessionFromCookies } from './lib/auth';

export async function onRequest(context: APIContext, next: () => Promise<Response>) {
    const { url, cookies, redirect } = context;

    // Check if the request is for an admin page
    if (url.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (url.pathname === '/admin/login') {
            return next();
        }

        // Check for valid session
        const cookieHeader = context.request.headers.get('cookie');
        const session = getSessionFromCookies(cookieHeader);

        if (!session) {
            // Redirect to login if not authenticated
            return redirect('/admin/login');
        }
    }

    return next();
}
