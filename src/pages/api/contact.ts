import type { APIRoute } from 'astro';
import { sendContactNotification } from '../../lib/email';
import { sanitizeInput, isValidEmail, isValidName, isSafeInput } from '../../lib/security';

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

        // Security validation
        if (!isSafeInput(name) || !isSafeInput(email) || !isSafeInput(message)) {
            return new Response(JSON.stringify({ error: 'Ungültige Eingabe erkannt.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return new Response(JSON.stringify({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate name
        if (!isValidName(name)) {
            return new Response(JSON.stringify({ error: 'Bitte geben Sie einen gültigen Namen an.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate message length
        if (message.length < 10 || message.length > 5000) {
            return new Response(JSON.stringify({ error: 'Die Nachricht muss zwischen 10 und 5000 Zeichen lang sein.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPhone = phone ? sanitizeInput(phone) : '';
        const sanitizedMessage = sanitizeInput(message);

        // Send email using shared library
        await sendContactNotification(sanitizedName, sanitizedEmail, sanitizedPhone, preferredDate, sanitizedMessage);

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
