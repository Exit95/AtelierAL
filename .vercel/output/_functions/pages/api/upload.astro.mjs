import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("📸 Upload request received");
  console.log("📋 Headers:", Object.fromEntries(request.headers.entries()));
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      console.log("❌ No file found in request");
      return new Response(JSON.stringify({ error: "Keine Datei hochgeladen" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(`📂 Processing file: ${file.name}, Size: ${file.size} bytes (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log(`❌ File too large: ${file.size} > ${maxSize}`);
      return new Response(JSON.stringify({
        error: `Datei zu groß. Maximum: 25MB, Ihre Datei: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      }), {
        status: 413,
        headers: { "Content-Type": "application/json" }
      });
    }
    const isProd = true;
    const uploadsDir = isProd ? join(process.cwd(), "uploads") : join(process.cwd(), "public", "uploads");
    console.log(`📂 Target directory: ${uploadsDir}`);
    await mkdir(uploadsDir, { recursive: true });
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const filename = `${timestamp}.${ext}`;
    const filepath = join(uploadsDir, filename);
    console.log(`📝 Writing to: ${filepath}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);
    console.log(`✅ File written successfully: ${filename}`);
    const url = `/uploads/${filename}`;
    return new Response(JSON.stringify({
      success: true,
      url,
      filename
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return new Response(JSON.stringify({
      error: "Upload fehlgeschlagen",
      details: error instanceof Error ? error.message : String(error)
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
