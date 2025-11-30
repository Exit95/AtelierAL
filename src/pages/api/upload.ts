import type { APIRoute } from 'astro';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'Keine Datei hochgeladen' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check file size (25MB limit)
        const maxSize = 25 * 1024 * 1024; // 25MB
        if (file.size > maxSize) {
            return new Response(JSON.stringify({
                error: `Datei zu groß. Maximum: 25MB, Ihre Datei: ${(file.size / 1024 / 1024).toFixed(2)}MB`
            }), {
                status: 413,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Determine upload directory based on environment
        const isProd = import.meta.env.PROD;
        const uploadsDir = isProd
            ? join(process.cwd(), 'uploads')
            : join(process.cwd(), 'public', 'uploads');

        await mkdir(uploadsDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const ext = file.name.split('.').pop();
        const filename = `${timestamp}.${ext}`;
        const filepath = join(uploadsDir, filename);

        // Write file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filepath, buffer);

        const url = `/uploads/${filename}`;
        return new Response(JSON.stringify({
            success: true,
            url,
            filename
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('❌ Upload error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');

        return new Response(JSON.stringify({
            error: 'Upload fehlgeschlagen',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
