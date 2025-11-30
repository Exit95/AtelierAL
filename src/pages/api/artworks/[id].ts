import type { APIRoute } from 'astro';
import { saveItem, deleteItem, type Artwork } from '../../../lib/storage';

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        if (!id) throw new Error('No ID provided');

        const data = await request.json();
        console.log('Artwork update request:', { id, data });

        const artwork: Artwork = {
            id,
            title: data.title,
            description: data.description,
            technique: data.technique,
            size: {
                width: parseInt(data.width),
                height: parseInt(data.height),
                unit: data.unit || 'cm'
            },
            availability: data.availability,
            price: data.price,
            images: Array.isArray(data.images)
                ? data.images
                : (typeof data.images === 'string'
                    ? data.images.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : [data.images].filter(Boolean)),
            tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags,
            featured: data.featured === 'true' || data.featured === true,
            createdDate: data.createdDate || new Date().toISOString()
        };

        await saveItem('artworks', id, artwork);

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

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { id } = params;
        if (!id) throw new Error('No ID provided');

        await deleteItem('artworks', id);

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
