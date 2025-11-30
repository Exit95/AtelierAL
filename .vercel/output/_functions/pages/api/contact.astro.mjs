import { sendContactNotification } from '../../chunks/email_BMWGYNOJ.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, preferredDate, message, privacy } = data;
    if (!name || !email || !message || !privacy) {
      return new Response(JSON.stringify({ error: "Bitte füllen Sie alle Pflichtfelder aus." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await sendContactNotification(name, email, phone, preferredDate, message);
    return new Response(JSON.stringify({ success: true, message: "Nachricht erfolgreich gesendet" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Senden der E-Mail." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
