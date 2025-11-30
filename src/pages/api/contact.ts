import type { APIRoute } from 'astro';
import { sendContactNotification } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, phone, preferredDate, message, privacy } = data;

        // Basic validation
        if (!name || !email || !message || !privacy) {
            return new Response(JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send email using shared library
        await sendContactNotification(name, email, phone, preferredDate, message);

        return new Response(JSON.stringify({ success: true, message: 'Nachricht erfolgreich gesendet' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Fehler beim Senden der E-Mail.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
