import type { APIRoute } from 'astro';
import { unlink } from 'fs/promises';
import { join } from 'path';

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { id } = params;

        const filePath = join(process.cwd(), 'src', 'content', 'workshops', `${id}.json`);
        await unlink(filePath);

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
