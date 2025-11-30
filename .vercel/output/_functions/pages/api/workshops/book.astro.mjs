import { g as getItem, s as saveItem } from '../../../chunks/storage_DpN-KgD-.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { workshopId, name, email, phone, participants } = data;
    if (!workshopId || !name || !email || !phone || !participants) {
      return new Response(JSON.stringify({ error: "Bitte füllen Sie alle Pflichtfelder aus." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const participantCount = parseInt(participants);
    let workshop;
    try {
      workshop = await getItem("workshops", workshopId);
      if (!workshop) {
        return new Response(JSON.stringify({ error: "Workshop nicht gefunden." }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (workshop.currentParticipants + participantCount > workshop.maxParticipants) {
        return new Response(JSON.stringify({ error: "Nicht genügend freie Plätze verfügbar." }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      workshop.currentParticipants += participantCount;
      await saveItem("workshops", workshopId, workshop);
    } catch (error) {
      console.error("Error updating workshop:", error);
      return new Response(JSON.stringify({ error: "Workshop nicht gefunden oder Fehler beim Speichern." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    try {
      const { sendBookingConfirmation, sendAdminNotification } = await import('../../../chunks/email_BMWGYNOJ.mjs');
      const date = new Date(workshop.date).toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }) + " | " + workshop.time;
      await Promise.all([
        sendBookingConfirmation(email, workshop.title, name, participantCount, date),
        sendAdminNotification(workshop.title, name, email, phone, participantCount, data.message)
      ]);
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Buchung erfolgreich! Bestätigung wurde versendet."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Booking error:", error);
    return new Response(JSON.stringify({ error: "Interner Serverfehler" }), {
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
