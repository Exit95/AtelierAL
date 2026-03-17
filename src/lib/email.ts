import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@atelierkl.de';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'studio@atelierkl.de';

// ── HTML Escaping (XSS Prevention) ────────────────────────────────
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ── Email Validation ──────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Send Result Type ──────────────────────────────────────────────
interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function safeSendMail(mailOptions: nodemailer.SendMailOptions): Promise<SendResult> {
  try {
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Email send failed:', msg);
    return { success: false, error: msg };
  }
}

export async function sendBookingConfirmation(
  to: string,
  workshopTitle: string,
  name: string,
  participants: number,
  date: string
): Promise<SendResult> {
  if (!isValidEmail(to)) {
    return { success: false, error: 'Invalid email address' };
  }

  const safeName = escapeHtml(name);
  const safeTitle = escapeHtml(workshopTitle);
  const safeDate = escapeHtml(date);

  const mailOptions = {
    from: `"ATELIER KL" <${FROM_EMAIL}>`,
    to,
    subject: `Buchungsbestätigung: ${workshopTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #eee; }
          .header h1 { margin: 0; color: #8B7355; font-size: 24px; letter-spacing: 1px; }
          .content { padding: 30px 0; }
          .card { background: #f9f9f9; border-radius: 8px; padding: 25px; margin: 20px 0; border-left: 4px solid #8B7355; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .footer { text-align: center; padding-top: 30px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ATELIER KL</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-top: 0;">Vielen Dank für Ihre Buchung!</h2>
            <p>Hallo ${safeName},</p>
            <p>wir freuen uns sehr, dass Sie sich für den Workshop <strong>${safeTitle}</strong> angemeldet haben. Ihre Buchung ist hiermit bestätigt.</p>

            <div class="card">
              <div class="detail-row">
                <span class="label">Workshop</span>
                <span class="value">${safeTitle}</span>
              </div>
              <div class="detail-row">
                <span class="label">Datum & Zeit</span>
                <span class="value">${safeDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Teilnehmer</span>
                <span class="value">${participants} Person(en)</span>
              </div>
            </div>

            <p>Bitte bringen Sie gute Laune und Kleidung mit, die auch mal einen Farbklecks abbekommen darf.</p>
            <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>

            <p>Mit kreativen Grüßen,<br>Katharina Lanvermann</p>
          </div>
          <div class="footer">
            <p>ATELIER KL - Bockhorn 68 - 48683 Ahaus</p>
            <p><a href="https://atelierkl.de" style="color: #8B7355; text-decoration: none;">www.atelierkl.de</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return safeSendMail(mailOptions);
}

export async function sendAdminNotification(
  workshopTitle: string,
  name: string,
  email: string,
  phone: string,
  participants: number,
  message: string
): Promise<SendResult> {
  const safeName = escapeHtml(name);
  const safeTitle = escapeHtml(workshopTitle);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message);

  const mailOptions = {
    from: `"ATELIER KL System" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `Neue Buchung: ${workshopTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
          .header { background: #f5f5f5; padding: 15px; border-radius: 6px 6px 0 0; border-bottom: 2px solid #8B7355; }
          .header h2 { margin: 0; color: #333; font-size: 18px; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 500; }
          .message-box { background: #fff9f0; padding: 15px; border-radius: 4px; border-left: 3px solid #8B7355; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Neue Workshop-Buchung eingegangen</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Workshop</span>
              <div class="value">${safeTitle}</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <span class="label">Personen</span>
                <div class="value">${participants}</div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${safeEmail}" style="color: #8B7355; text-decoration: none;">${safeEmail}</a></div>
            </div>

            <div class="field">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${safePhone}" style="color: #8B7355; text-decoration: none;">${safePhone}</a></div>
            </div>

            ${safeMessage ? `
              <div class="message-box">
                <span class="label">Nachricht des Kunden</span>
                <div style="margin-top: 5px;">${safeMessage.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return safeSendMail(mailOptions);
}

export async function sendContactNotification(
  name: string,
  email: string,
  phone: string,
  preferredDate: string,
  message: string
): Promise<SendResult> {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeDate = escapeHtml(preferredDate);
  const safeMessage = escapeHtml(message);

  const mailOptions = {
    from: `"ATELIER KL Kontakt" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `Neue Kontaktanfrage von ${escapeHtml(name)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
          .header { background: #f5f5f5; padding: 15px; border-radius: 6px 6px 0 0; border-bottom: 2px solid #8B7355; }
          .header h2 { margin: 0; color: #333; font-size: 18px; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 500; }
          .message-box { background: #fff9f0; padding: 15px; border-radius: 4px; border-left: 3px solid #8B7355; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Neue Kontaktanfrage</h2>
          </div>
          <div class="content">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <span class="label">Wunschtermin</span>
                <div class="value">${safeDate || '-'}</div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${safeEmail}" style="color: #8B7355; text-decoration: none;">${safeEmail}</a></div>
            </div>

            <div class="field">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${safePhone}" style="color: #8B7355; text-decoration: none;">${safePhone || '-'}</a></div>
            </div>

            <div class="message-box">
              <span class="label">Nachricht</span>
              <div style="margin-top: 5px;">${safeMessage.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return safeSendMail(mailOptions);
}

export async function sendArtworkInquiry(
  name: string,
  email: string,
  phone: string,
  message: string,
  artworkTitle: string,
  artworkId: string,
  artworkPrice: string,
  artworkSize: string
): Promise<SendResult> {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message);
  const safeTitle = escapeHtml(artworkTitle);
  const safeId = escapeHtml(artworkId);
  const safePrice = escapeHtml(artworkPrice);
  const safeSize = escapeHtml(artworkSize);

  const mailOptions = {
    from: `"ATELIER KL Werk-Anfrage" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `Anfrage zum Werk: ${artworkTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
          .header { background: #f5f5f5; padding: 15px; border-radius: 6px 6px 0 0; border-bottom: 2px solid #8B7355; }
          .header h2 { margin: 0; color: #333; font-size: 18px; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 500; }
          .artwork-box { background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #8B7355; margin-bottom: 20px; }
          .message-box { background: #fff9f0; padding: 15px; border-radius: 4px; border-left: 3px solid #8B7355; margin-top: 20px; }
          .btn { display: inline-block; background: #8B7355; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Neue Anfrage zu einem Kunstwerk</h2>
          </div>
          <div class="content">
            <div class="artwork-box">
              <div class="field">
                <span class="label">Angefragtes Werk</span>
                <div class="value" style="font-size: 20px; color: #8B7355;">${safeTitle}</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div class="field" style="margin-bottom: 0;">
                  <span class="label">Preis</span>
                  <div class="value">${safePrice} &euro;</div>
                </div>
                <div class="field" style="margin-bottom: 0;">
                  <span class="label">Gr&ouml;&szlig;e</span>
                  <div class="value">${safeSize}</div>
                </div>
              </div>
              <a href="https://atelierkl.de/werke/${safeId}" class="btn">Werk ansehen</a>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="field">
                <span class="label">Interessent</span>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <span class="label">Telefon</span>
                <div class="value"><a href="tel:${safePhone}" style="color: #8B7355; text-decoration: none;">${safePhone || '-'}</a></div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${safeEmail}" style="color: #8B7355; text-decoration: none;">${safeEmail}</a></div>
            </div>

            <div class="message-box">
              <span class="label">Nachricht</span>
              <div style="margin-top: 5px;">${safeMessage.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return safeSendMail(mailOptions);
}
