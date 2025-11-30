import { join, extname } from 'node:path';
import { readFile } from 'node:fs/promises';
export { renderers } from '../../renderers.mjs';

const uploadsDir = join(process.cwd(), "uploads") ;
function getContentType(filename) {
  const ext = extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}
const GET = async ({ params }) => {
  const filename = (params.filename || "").toString();
  if (!filename || filename.includes("../") || filename.includes("..\\") || filename.includes("/")) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const filepath = join(uploadsDir, filename);
    const data = await readFile(filepath);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": getContentType(filename),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (err) {
    if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) {
      return new Response("Not found", { status: 404 });
    }
    console.error("Error serving uploaded file", err);
    return new Response("Internal server error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
