import type { APIRoute } from 'astro';
import { verifyCredentials, createSession, createSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return new Response(JSON.stringify({
                error: 'Benutzername und Passwort erforderlich'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Login attempt:', { username, passwordReceived: !!password, passwordLength: password?.length });

        const isValid = await verifyCredentials(username, password);
        console.log('Credentials valid:', isValid);

        if (!isValid) {
            return new Response(JSON.stringify({
                error: 'Ungültige Anmeldedaten'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create session
        const sessionId = createSession(username);
        const sessionCookie = createSessionCookie(sessionId);

        return new Response(JSON.stringify({
            success: true,
            redirect: '/admin'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': sessionCookie
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        console.error('Login error:', error);
        return new Response(JSON.stringify({
            error: `Fehler: ${error instanceof Error ? error.message : String(error)}`
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
