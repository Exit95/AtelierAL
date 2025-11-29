import type { APIRoute } from 'astro';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { workshopId, name, email, participants } = data;

        if (!workshopId || !name || !email || !participants) {
            return new Response(JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const participantCount = parseInt(participants);

        // 1. Update workshop participant count
        const workshopPath = join(process.cwd(), 'src/content/workshops', `${workshopId}.json`);

        try {
            const fileContent = await readFile(workshopPath, 'utf-8');
            const workshop = JSON.parse(fileContent);

            // Check if enough spots available
            if (workshop.currentParticipants + participantCount > workshop.maxParticipants) {
                return new Response(JSON.stringify({ error: 'Nicht genügend freie Plätze verfügbar.' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Update count
            workshop.currentParticipants += participantCount;
            await writeFile(workshopPath, JSON.stringify(workshop, null, 2));

        } catch (error) {
            console.error('Error updating workshop:', error);
            return new Response(JSON.stringify({ error: 'Workshop nicht gefunden oder Fehler beim Speichern.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Here you would typically send emails
        // For now, we just log it
        console.log(`New booking for workshop ${workshopId}:`, {
            name,
            email,
            participants: participantCount,
            timestamp: new Date().toISOString()
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Buchung erfolgreich!'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Booking error:', error);
        return new Response(JSON.stringify({ error: 'Interner Serverfehler' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
