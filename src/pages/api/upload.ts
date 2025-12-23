import type { APIRoute } from 'astro';
import Busboy from 'busboy';
import { Readable } from 'stream';
import { lookup } from 'mime-types';
import { uploadToS3 } from '../../lib/s3';

export const POST: APIRoute = async ({ request }) => {
    return new Promise(async (resolve) => {
        try {
            const contentType = request.headers.get('content-type');
            if (!contentType || !contentType.includes('multipart/form-data')) {
                resolve(new Response(JSON.stringify({ error: 'Invalid content type' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }));
                return;
            }

            const busboy = Busboy({ headers: { 'content-type': contentType } });

            let filename = '';
            let fileBuffer: Buffer | null = null;
            let resolved = false;

            busboy.on('field', (fieldname, val) => {
                if (fieldname === 'filename') filename = val;
            });

            busboy.on('file', (fieldname, file, info) => {
                if (fieldname !== 'file') {
                    file.resume();
                    return;
                }

                const chunks: Buffer[] = [];

                file.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                file.on('end', () => {
                    fileBuffer = Buffer.concat(chunks);
                });
            });

            busboy.on('finish', async () => {
                if (resolved) return;
                resolved = true;

                if (!fileBuffer) {
                    resolve(new Response(JSON.stringify({ error: 'No file uploaded' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                    return;
                }

                try {
                    const timestamp = Date.now();
                    const ext = filename.split('.').pop() || 'jpg';
                    const finalFilename = `${timestamp}.${ext}`;
                    const mimeType = lookup(finalFilename) || 'application/octet-stream';

                    const url = await uploadToS3(finalFilename, fileBuffer, mimeType);

                    resolve(new Response(JSON.stringify({
                        success: true,
                        url,
                        filename: finalFilename,
                        completed: true
                    }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                } catch (error) {
                    console.error('❌ S3 Upload error:', error);
                    resolve(new Response(JSON.stringify({
                        error: 'S3 Upload failed',
                        details: error instanceof Error ? error.message : String(error)
                    }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                }
            });

            busboy.on('error', (error) => {
                if (resolved) return;
                resolved = true;
                console.error('❌ Busboy error:', error);
                resolve(new Response(JSON.stringify({
                    error: 'Upload parsing failed',
                    details: error instanceof Error ? error.message : String(error)
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }));
            });

            const nodeStream = Readable.fromWeb(request.body as any);
            nodeStream.pipe(busboy);

        } catch (error) {
            console.error('❌ Upload error:', error);
            resolve(new Response(JSON.stringify({
                error: 'Upload fehlgeschlagen',
                details: error instanceof Error ? error.message : String(error)
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
    });
};
