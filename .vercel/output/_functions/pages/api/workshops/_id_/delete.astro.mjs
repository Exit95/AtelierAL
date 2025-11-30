import { d as deleteItem } from '../../../../chunks/storage_DpN-KgD-.mjs';
export { renderers } from '../../../../renderers.mjs';

const DELETE = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) throw new Error("No ID provided");
    await deleteItem("workshops", id);
    return new Response(JSON.stringify({
      success: true,
      message: "Workshop erfolgreich gelöscht"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return new Response(JSON.stringify({
      error: "Fehler beim Löschen des Workshops"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
