import type { APIRoute } from 'astro';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { workshopId, name, email, phone, participants } = data;

        if (!workshopId || !name || !email || !phone || !participants) {
            return new Response(JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const participantCount = parseInt(participants);
        let workshop;

        // 1. Update workshop participant count
        const workshopPath = join(process.cwd(), 'src/content/workshops', `${workshopId}.json`);

        try {
            const fileContent = await readFile(workshopPath, 'utf-8');
            workshop = JSON.parse(fileContent);

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

        // 2. Send emails
        try {
            const { sendBookingConfirmation, sendAdminNotification } = await import('../../../lib/email');

            // Format date for email
            const date = new Date(workshop.date).toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) + ' | ' + workshop.time;

            await Promise.all([
                sendBookingConfirmation(email, workshop.title, name, participantCount, date),
                sendAdminNotification(workshop.title, name, email, phone, participantCount, data.message)
            ]);
        } catch (emailError) {
            console.error('Error sending emails:', emailError);
            // Don't fail the request if email fails, but log it
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Buchung erfolgreich! Bestätigung wurde versendet.'
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
