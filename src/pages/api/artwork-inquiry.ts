import type { APIRoute } from 'astro';
import { sendArtworkInquiry } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { 
            name, 
            email, 
            phone, 
            message, 
            privacy,
            artworkTitle,
            artworkId,
            artworkPrice,
            artworkSize
        } = data;

        // Basic validation
        if (!name || !email || !message || !privacy) {
            return new Response(JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!artworkId || !artworkTitle) {
            return new Response(JSON.stringify({ error: 'Werk-Informationen fehlen.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send email using shared library
        await sendArtworkInquiry(
            name, 
            email, 
            phone || '', 
            message, 
            artworkTitle, 
            artworkId, 
            artworkPrice || 'auf Anfrage',
            artworkSize || ''
        );

        return new Response(JSON.stringify({ success: true, message: 'Anfrage erfolgreich gesendet' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error sending artwork inquiry:', error);
        return new Response(JSON.stringify({ error: 'Fehler beim Senden der Anfrage.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

