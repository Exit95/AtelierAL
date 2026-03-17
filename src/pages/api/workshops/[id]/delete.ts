import type { APIRoute } from 'astro';
import { deleteWorkshop } from '../../../../lib/database';
import { getSessionFromCookies } from '../../../../lib/auth';

function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get('cookie');
    return !!getSessionFromCookies(cookieHeader);
}

export const DELETE: APIRoute = async ({ params, request }) => {
    if (!isAuthenticated(request)) {
        return new Response(JSON.stringify({ error: 'Nicht autorisiert' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { id } = params;
        if (!id) throw new Error('No ID provided');

        deleteWorkshop(id);

        return new Response(JSON.stringify({
            success: true,
            message: 'Workshop erfolgreich gelöscht'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error deleting workshop:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Löschen des Workshops'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
