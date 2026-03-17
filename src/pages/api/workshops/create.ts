import type { APIRoute } from 'astro';
import { saveWorkshop, type Workshop } from '../../../lib/database';
import { getSessionFromCookies } from '../../../lib/auth';

function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get('cookie');
    return !!getSessionFromCookies(cookieHeader);
}

export const POST: APIRoute = async ({ request }) => {
    if (!isAuthenticated(request)) {
        return new Response(JSON.stringify({ error: 'Nicht autorisiert' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const data = await request.json();

        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Titel ist erforderlich' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const id = data.title
            .toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const workshop: Workshop = {
            id,
            title: data.title.trim(),
            description: data.description || '',
            date: new Date(data.date).toISOString(),
            time: data.time || '',
            duration: data.duration || '',
            location: data.location || '',
            maxParticipants: parseInt(data.maxParticipants) || 10,
            currentParticipants: parseInt(data.currentParticipants || '0'),
            materials: typeof data.materials === 'string'
                ? data.materials.split('\n').filter((m: string) => m.trim())
                : (data.materials || []),
            price: parseFloat(data.price) || 0,
            image: data.image || '',
            bookingEnabled: data.bookingEnabled === 'on' || data.bookingEnabled === 'true' || data.bookingEnabled === true
        };

        saveWorkshop(workshop);

        return new Response(JSON.stringify({
            success: true,
            id,
            message: 'Workshop erfolgreich erstellt'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error creating workshop:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Erstellen des Workshops'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
