import { unlink } from 'fs/promises';
import { join } from 'path';
export { renderers } from '../../../renderers.mjs';

const DELETE = async ({ params }) => {
  try {
    const filename = params.filename;
    if (!filename) {
      return new Response(JSON.stringify({ error: "Kein Dateiname angegeben" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const isProd = true;
    const uploadsDir = isProd ? join(process.cwd(), "uploads") : join(process.cwd(), "public", "uploads");
    const filepath = join(uploadsDir, filename);
    await unlink(filepath);
    return new Response(JSON.stringify({
      success: true,
      message: "Bild gelöscht"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return new Response(JSON.stringify({
      error: "Löschen fehlgeschlagen",
      details: error instanceof Error ? error.message : String(error)
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
