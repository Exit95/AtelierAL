import type { APIRoute } from 'astro';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        const data = await request.json();

        // Prepare workshop data
        const workshop = {
            title: data.title,
            description: data.description,
            date: new Date(data.date).toISOString(),
            time: data.time,
            duration: data.duration,
            location: data.location,
            maxParticipants: parseInt(data.maxParticipants),
            currentParticipants: parseInt(data.currentParticipants || '0'),
            materials: Array.isArray(data.materials) ? data.materials : data.materials.split('\n').filter((m: string) => m.trim()),
            price: parseFloat(data.price),
            image: data.image,
            bookingEnabled: data.bookingEnabled === 'true' || data.bookingEnabled === true
        };

        // Write to file
        const filePath = join(process.cwd(), 'src', 'content', 'workshops', `${id}.json`);
        await writeFile(filePath, JSON.stringify(workshop, null, 2), 'utf-8');

        return new Response(JSON.stringify({
            success: true,
            message: 'Workshop erfolgreich aktualisiert'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating workshop:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Aktualisieren des Workshops'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
