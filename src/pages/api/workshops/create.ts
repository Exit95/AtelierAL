import type { APIRoute } from 'astro';
import { saveItem, type Workshop } from '../../../lib/storage';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Generate ID from title
        const id = data.title
            .toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Prepare workshop data
        const workshop: Workshop = {
            id,
            title: data.title,
            description: data.description,
            date: new Date(data.date).toISOString(),
            time: data.time,
            duration: data.duration,
            location: data.location,
            maxParticipants: parseInt(data.maxParticipants),
            currentParticipants: parseInt(data.currentParticipants || '0'),
            materials: data.materials.split('\n').filter((m: string) => m.trim()),
            price: parseFloat(data.price),
            image: data.image,
            bookingEnabled: data.bookingEnabled === 'on' || data.bookingEnabled === 'true' || data.bookingEnabled === true
        };

        // Write to file
        await saveItem('workshops', id, workshop);

        return new Response(JSON.stringify({
            success: true,
            id,
            message: 'Workshop erfolgreich erstellt'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error creating workshop:', error);
        return new Response(JSON.stringify({
            error: 'Fehler beim Erstellen des Workshops',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
