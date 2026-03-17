import type { APIRoute } from 'astro';
import { saveArtwork, deleteArtwork, type Artwork } from '../../../lib/database';
import { getSessionFromCookies } from '../../../lib/auth';

function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get('cookie');
    return !!getSessionFromCookies(cookieHeader);
}

export const PUT: APIRoute = async ({ params, request }) => {
    if (!isAuthenticated(request)) {
        return new Response(JSON.stringify({ error: 'Nicht autorisiert' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { id } = params;
        if (!id) throw new Error('No ID provided');

        const data = await request.json();

        const artwork: Artwork = {
            id,
            title: data.title,
            description: data.description,
            technique: data.technique,
            size: {
                width: parseInt(data.width) || 0,
                height: parseInt(data.height) || 0,
                unit: data.unit || 'cm'
            },
            availability: data.availability,
            price: data.price,
            images: Array.isArray(data.images)
                ? data.images
                : (typeof data.images === 'string'
                    ? data.images.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : [data.images].filter(Boolean)),
            tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : (data.tags || []),
            featured: data.featured === 'true' || data.featured === true,
            createdDate: data.createdDate || new Date().toISOString()
        };

        saveArtwork(artwork);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Fehler beim Aktualisieren' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

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

        deleteArtwork(id);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Fehler beim Löschen' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
