import type { APIRoute } from "astro";
import { join, extname } from "node:path";
import { readFile } from "node:fs/promises";

const isProd = import.meta.env.PROD;
const uploadsDir = isProd
  ? join(process.cwd(), "uploads")
  : join(process.cwd(), "public", "uploads");

function getContentType(filename: string): string {
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

export const GET: APIRoute = async ({ params }) => {
  const filename = (params.filename || "").toString();

  // Sicherheit: keine Pfadausbrueche erlauben
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
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: any) {
    if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) {
      return new Response("Not found", { status: 404 });
    }

    console.error("Error serving uploaded file", err);
    return new Response("Internal server error", { status: 500 });
  }
};

