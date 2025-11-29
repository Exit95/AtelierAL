import type { APIRoute } from 'astro';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        const data = await request.json();

        const artwork = {
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
            images: Array.isArray(data.images) ? data.images : [data.images].filter(Boolean),
            tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags,
            featured: data.featured === 'true' || data.featured === true,
            createdDate: data.createdDate || new Date().toISOString()
        };

        const filePath = join(process.cwd(), 'src', 'content', 'artworks', `${id}.json`);
        await writeFile(filePath, JSON.stringify(artwork, null, 2), 'utf-8');

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
        const filePath = join(process.cwd(), 'src', 'content', 'artworks', `${id}.json`);
        await unlink(filePath);

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
