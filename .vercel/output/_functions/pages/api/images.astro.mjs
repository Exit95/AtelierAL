import { readdir, stat } from 'fs/promises';
import { join } from 'path';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const isProd = true;
    const uploadsDir = isProd ? join(process.cwd(), "uploads") : join(process.cwd(), "public", "uploads");
    const files = (await readdir(uploadsDir)).filter((file) => !file.startsWith("."));
    const images = await Promise.all(
      files.map(async (file) => {
        const filePath = join(uploadsDir, file);
        const stats = await stat(filePath);
        return {
          name: file,
          url: `/uploads/${file}`,
          size: stats.size,
          date: stats.mtime
        };
      })
    );
    images.sort((a, b) => b.date.getTime() - a.date.getTime());
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error listing images:", error);
    return new Response(JSON.stringify({ error: "Failed to list images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
