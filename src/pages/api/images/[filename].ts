import type { APIRoute } from 'astro';
import { getFromS3, deleteFromS3 } from '../../../lib/s3';

export const GET: APIRoute = async ({ params }) => {
    try {
        const filename = params.filename;

        if (!filename) {
            return new Response('File not found', { status: 404 });
        }

        const file = await getFromS3(filename);

        if (!file) {
            return new Response('File not found', { status: 404 });
        }

        return new Response(file.buffer, {
            status: 200,
            headers: {
                'Content-Type': file.contentType,
                'Cache-Control': 'public, max-age=31536000',
            }
        });
    } catch (error) {
        console.error('❌ S3 read error:', error);
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

        await deleteFromS3(filename);

        return new Response(JSON.stringify({
            success: true,
            message: 'Bild gelöscht'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('❌ S3 delete error:', error);

        return new Response(JSON.stringify({
            error: 'Löschen fehlgeschlagen',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
