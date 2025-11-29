import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { IncomingForm } from 'formidable';
import type { IncomingMessage } from 'http';

export const POST: APIRoute = async ({ request }) => {
    console.log('📸 Upload request received');

    try {
        const isProd = import.meta.env.PROD;
        const uploadsDir = isProd
            ? join(process.cwd(), 'uploads')
            : join(process.cwd(), 'public', 'uploads');

        await mkdir(uploadsDir, { recursive: true });

        // Use formidable for handling large file uploads
        return new Promise((resolve) => {
            const form = new IncomingForm({
                uploadDir: uploadsDir,
                keepExtensions: true,
                maxFileSize: 25 * 1024 * 1024, // 25MB
                filename: (name, ext) => {
                    const timestamp = Date.now();
                    return `${timestamp}${ext}`;
                }
            });

            // Convert Request to IncomingMessage-like object
            const req = request as unknown as IncomingMessage;

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error('❌ Upload error:', err);
                    resolve(new Response(JSON.stringify({
                        error: 'Upload fehlgeschlagen',
                        details: err.message
                    }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                    return;
                }

                const file = Array.isArray(files.file) ? files.file[0] : files.file;

                if (!file) {
                    resolve(new Response(JSON.stringify({ error: 'Keine Datei hochgeladen' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                    return;
                }

                const filename = file.newFilename || `${Date.now()}.${file.originalFilename?.split('.').pop()}`;
                const url = `/uploads/${filename}`;

                console.log(`✅ File uploaded: ${filename}`);

                resolve(new Response(JSON.stringify({
                    success: true,
                    url,
                    filename
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }));
            });
        });
    } catch (error) {
        console.error('❌ Upload error:', error);
        return new Response(JSON.stringify({
            error: 'Interner Serverfehler'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
