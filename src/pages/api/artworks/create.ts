import type { APIRoute } from 'astro';
import { saveItem, type Artwork } from '../../../lib/storage';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

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
            createdDate: new Date().toISOString()
        };

        await saveItem('artworks', id, artwork);

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
