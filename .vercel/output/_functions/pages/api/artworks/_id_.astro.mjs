import { s as saveItem, d as deleteItem } from '../../../chunks/storage_Coa8lX9P.mjs';
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) throw new Error("No ID provided");
    const data = await request.json();
    const artwork = {
      id,
      title: data.title,
      description: data.description,
      technique: data.technique,
      size: {
        width: parseInt(data.width),
        height: parseInt(data.height),
        unit: data.unit || "cm"
      },
      availability: data.availability,
      price: data.price,
      images: Array.isArray(data.images) ? data.images : [data.images].filter(Boolean),
      tags: typeof data.tags === "string" ? data.tags.split(",").map((t) => t.trim()) : data.tags,
      featured: data.featured === "true" || data.featured === true,
      createdDate: data.createdDate || (/* @__PURE__ */ new Date()).toISOString()
    };
    await saveItem("artworks", id, artwork);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fehler beim Aktualisieren" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) throw new Error("No ID provided");
    await deleteItem("artworks", id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fehler beim Löschen" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
