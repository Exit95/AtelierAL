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

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
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
        console.error('Upload error:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Hochladen der Datei'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
