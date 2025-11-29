import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("📸 Upload request received");
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
    console.log(`📂 Processing file: ${file.name}, Size: ${file.size}`);
    const isProd = true;
    console.log(`🌍 Environment: ${isProd ? "PRODUCTION" : "DEVELOPMENT"}`);
    console.log(`📍 CWD: ${process.cwd()}`);
    const uploadsDir = isProd ? join(process.cwd(), "uploads") : join(process.cwd(), "public", "uploads");
    console.log(`📂 Target directory: ${uploadsDir}`);
    await mkdir(uploadsDir, { recursive: true });
    console.log("✅ Directory created/verified");
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const filename = `${timestamp}.${ext}`;
    const filepath = join(uploadsDir, filename);
    console.log(`📝 Writing to: ${filepath}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);
    console.log("✅ File written successfully");
    const url = `/uploads/${filename}`;
    console.log(`🔗 Generated URL: ${url}`);
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
    return new Response(JSON.stringify({
      error: "Fehler beim Hochladen der Datei: " + (error instanceof Error ? error.message : String(error))
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
