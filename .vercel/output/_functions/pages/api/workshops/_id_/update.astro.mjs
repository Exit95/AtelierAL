import { s as saveItem } from '../../../../chunks/storage_DpN-KgD-.mjs';
export { renderers } from '../../../../renderers.mjs';

const PUT = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) throw new Error("No ID provided");
    const data = await request.json();
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
      materials: Array.isArray(data.materials) ? data.materials : data.materials.split("\n").filter((m) => m.trim()),
      price: parseFloat(data.price),
      image: data.image,
      bookingEnabled: data.bookingEnabled === "true" || data.bookingEnabled === true
    };
    await saveItem("workshops", id, workshop);
    return new Response(JSON.stringify({
      success: true,
      message: "Workshop erfolgreich aktualisiert"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating workshop:", error);
    return new Response(JSON.stringify({
      error: "Fehler beim Aktualisieren des Workshops"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
