import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '2a01:4f8:202:1129:2447:2447:1:80',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'office@danapfel-digital.de',
    pass: process.env.SMTP_PASS || ':,30,seNDSK',
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendBookingConfirmation(
  to: string,
  workshopTitle: string,
  name: string,
  participants: number,
  date: string
) {
  const mailOptions = {
    from: '"ATELIER KL" <office@danapfel-digital.de>',
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
          .btn { display: inline-block; background: #8B7355; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ATELIER KL</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-top: 0;">Vielen Dank für Ihre Buchung!</h2>
            <p>Hallo ${name},</p>
            <p>wir freuen uns sehr, dass Sie sich für den Workshop <strong>${workshopTitle}</strong> angemeldet haben. Ihre Buchung ist hiermit bestätigt.</p>
            
            <div class="card">
              <div class="detail-row">
                <span class="label">Workshop</span>
                <span class="value">${workshopTitle}</span>
              </div>
              <div class="detail-row">
                <span class="label">Datum & Zeit</span>
                <span class="value">${date}</span>
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

  await transporter.sendMail(mailOptions);
}

export async function sendAdminNotification(
  workshopTitle: string,
  name: string,
  email: string,
  phone: string,
  participants: number,
  message: string
) {
  const mailOptions = {
    from: '"ATELIER KL System" <office@danapfel-digital.de>',
    to: 'studio@atelierkl.de',
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
              <div class="value">${workshopTitle}</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Personen</span>
                <div class="value">${participants}</div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${email}" style="color: #8B7355; text-decoration: none;">${email}</a></div>
            </div>

            <div class="field">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${phone}" style="color: #8B7355; text-decoration: none;">${phone}</a></div>
            </div>

            ${message ? `
              <div class="message-box">
                <span class="label">Nachricht des Kunden</span>
                <div style="margin-top: 5px;">${message.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendContactNotification(
  name: string,
  email: string,
  phone: string,
  preferredDate: string,
  message: string
) {
  const mailOptions = {
    from: '"ATELIER KL Kontakt" <office@danapfel-digital.de>',
    to: 'studio@atelierkl.de',
    replyTo: email,
    subject: `Neue Kontaktanfrage von ${name}`,
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
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Wunschtermin</span>
                <div class="value">${preferredDate || '-'}</div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${email}" style="color: #8B7355; text-decoration: none;">${email}</a></div>
            </div>

            <div class="field">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${phone}" style="color: #8B7355; text-decoration: none;">${phone || '-'}</a></div>
            </div>

            <div class="message-box">
              <span class="label">Nachricht</span>
              <div style="margin-top: 5px;">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
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
) {
  const mailOptions = {
    from: '"ATELIER KL Werk-Anfrage" <office@danapfel-digital.de>',
    to: 'studio@atelierkl.de',
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
            <h2>🎨 Neue Anfrage zu einem Kunstwerk</h2>
          </div>
          <div class="content">
            <div class="artwork-box">
              <div class="field">
                <span class="label">Angefragtes Werk</span>
                <div class="value" style="font-size: 20px; color: #8B7355;">${artworkTitle}</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div class="field" style="margin-bottom: 0;">
                  <span class="label">Preis</span>
                  <div class="value">${artworkPrice} €</div>
                </div>
                <div class="field" style="margin-bottom: 0;">
                  <span class="label">Größe</span>
                  <div class="value">${artworkSize}</div>
                </div>
              </div>
              <a href="https://atelierkl.de/werke/${artworkId}" class="btn">Werk ansehen →</a>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="field">
                <span class="label">Interessent</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Telefon</span>
                <div class="value"><a href="tel:${phone}" style="color: #8B7355; text-decoration: none;">${phone || '-'}</a></div>
              </div>
            </div>

            <div class="field">
              <span class="label">E-Mail</span>
              <div class="value"><a href="mailto:${email}" style="color: #8B7355; text-decoration: none;">${email}</a></div>
            </div>

            <div class="message-box">
              <span class="label">Nachricht</span>
              <div style="margin-top: 5px;">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
