import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

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

        // Check for environment variables
        if (!import.meta.env.SMTP_HOST || !import.meta.env.SMTP_USER || !import.meta.env.SMTP_PASS) {
            console.error('SMTP configuration missing');
            return new Response(JSON.stringify({ error: 'Server-Konfiguration fehlt.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: import.meta.env.SMTP_HOST,
            port: parseInt(import.meta.env.SMTP_PORT || '587'),
            secure: import.meta.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: import.meta.env.SMTP_USER,
                pass: import.meta.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${import.meta.env.SMTP_USER}>`, // Sender address (must be authenticated user usually)
            replyTo: email,
            to: import.meta.env.CONTACT_EMAIL || 'danapfelmichael7@gmail.com', // Recipient
            subject: `Neue Kontaktanfrage von ${name}`,
            text: `
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || '-'}
Wunschtermin: ${preferredDate || '-'}

Nachricht:
${message}
            `,
            html: `
<h3>Neue Kontaktanfrage</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>E-Mail:</strong> ${email}</p>
<p><strong>Telefon:</strong> ${phone || '-'}</p>
<p><strong>Wunschtermin:</strong> ${preferredDate || '-'}</p>
<br>
<p><strong>Nachricht:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

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
