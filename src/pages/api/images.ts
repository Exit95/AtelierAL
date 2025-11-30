import type { APIRoute } from 'astro';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export const GET: APIRoute = async () => {
    try {
        const isProd = import.meta.env.PROD;
        const uploadsDir = isProd
            ? join(process.cwd(), 'uploads')
            : join(process.cwd(), 'public', 'uploads');

        const files = (await readdir(uploadsDir)).filter(file => !file.startsWith('.') && file !== 'temp');

        const images = await Promise.all(
            files.map(async (file) => {
                const filePath = join(uploadsDir, file);
                const stats = await stat(filePath);

                // Skip directories
                if (stats.isDirectory()) {
                    return null;
                }

                return {
                    name: file,
                    url: `/uploads/${file}`,
                    size: stats.size,
                    date: stats.mtime
                };
            })
        );

        // Filter out null values (directories)
        const validImages = images.filter(img => img !== null);

        // Sort by date desc
        validImages.sort((a, b) => b.date.getTime() - a.date.getTime());

        return new Response(JSON.stringify(validImages), {
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
