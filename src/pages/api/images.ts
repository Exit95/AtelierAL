import type { APIRoute } from 'astro';
import { listImagesFromS3 } from '../../lib/s3';

export const GET: APIRoute = async () => {
    try {
        const images = await listImagesFromS3();

        return new Response(JSON.stringify(images), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error listing images:', error);
        return new Response(JSON.stringify({ error: 'Failed to list images' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
