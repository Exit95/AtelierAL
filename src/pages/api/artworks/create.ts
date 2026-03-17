import type { APIRoute } from 'astro';
import { saveArtwork, type Artwork } from '../../../lib/database';
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

        const artwork: Artwork = {
            id,
            title: data.title.trim(),
            description: data.description || '',
            technique: data.technique || '',
            size: {
                width: parseInt(data.width) || 0,
                height: parseInt(data.height) || 0,
                unit: data.unit || 'cm'
            },
            availability: data.availability || 'available',
            price: data.price || '',
            images: Array.isArray(data.images)
                ? data.images
                : (typeof data.images === 'string'
                    ? data.images.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : [data.images].filter(Boolean)),
            tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : (data.tags || []),
            featured: data.featured === 'true' || data.featured === true,
            createdDate: new Date().toISOString()
        };

        saveArtwork(artwork);

        return new Response(JSON.stringify({
            success: true,
            id,
            message: 'Werk erfolgreich erstellt'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error creating artwork:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Erstellen des Werks'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
