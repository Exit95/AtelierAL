import type { APIRoute } from 'astro';
import { unlink, readFile } from 'fs/promises';
import { join } from 'path';
import { lookup } from 'mime-types';

export const GET: APIRoute = async ({ params }) => {
    try {
        const filename = params.filename;

        if (!filename) {
            return new Response('File not found', { status: 404 });
        }

        // Determine upload directory based on environment
        const isProd = import.meta.env.PROD;
        const uploadsDir = isProd
            ? join(process.cwd(), 'uploads')
            : join(process.cwd(), 'public', 'uploads');

        const filepath = join(uploadsDir, filename);

        // Read and serve the file
        const fileBuffer = await readFile(filepath);
        const mimeType = lookup(filename) || 'application/octet-stream';

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=31536000',
            }
        });
    } catch (error) {
        console.error('❌ File read error:', error);
        return new Response('File not found', { status: 404 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const filename = params.filename;

        if (!filename) {
            return new Response(JSON.stringify({ error: 'Kein Dateiname angegeben' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Determine upload directory based on environment
        const isProd = import.meta.env.PROD;
        const uploadsDir = isProd
            ? join(process.cwd(), 'uploads')
            : join(process.cwd(), 'public', 'uploads');

        const filepath = join(uploadsDir, filename);

        // Delete the file
        await unlink(filepath);

        return new Response(JSON.stringify({
            success: true,
            message: 'Bild gelöscht'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('❌ Delete error:', error);

        return new Response(JSON.stringify({
            error: 'Löschen fehlgeschlagen',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
