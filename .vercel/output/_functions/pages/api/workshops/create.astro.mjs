import { s as saveItem } from '../../../chunks/storage_ARbyxPSG.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const id = data.title.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const workshop = {
      id,
      title: data.title,
      description: data.description,
      date: new Date(data.date).toISOString(),
      time: data.time,
      duration: data.duration,
      location: data.location,
      maxParticipants: parseInt(data.maxParticipants),
      currentParticipants: parseInt(data.currentParticipants || "0"),
      materials: data.materials.split("\n").filter((m) => m.trim()),
      price: parseFloat(data.price),
      image: data.image,
      bookingEnabled: data.bookingEnabled === "on" || data.bookingEnabled === "true" || data.bookingEnabled === true
    };
    await saveItem("workshops", id, workshop);
    return new Response(JSON.stringify({
      success: true,
      id,
      message: "Workshop erfolgreich erstellt"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating workshop:", error);
    return new Response(JSON.stringify({
      error: "Fehler beim Erstellen des Workshops",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
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
