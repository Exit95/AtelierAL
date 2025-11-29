import { readdir, readFile, mkdir, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_DIR = join(process.cwd(), "data");
async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}
async function getItems(collection) {
  const dir = join(DATA_DIR, collection);
  await ensureDir(dir);
  const files = await readdir(dir);
  const items = [];
  for (const file of files) {
    if (file.endsWith(".json")) {
      try {
        const content = await readFile(join(dir, file), "utf-8");
        const item = JSON.parse(content);
        if (!item.id) {
          item.id = file.replace(".json", "");
        }
        items.push(item);
      } catch (err) {
        console.error(`Error reading ${collection} item ${file}:`, err);
      }
    }
  }
  return items;
}
async function saveItem(collection, id, data) {
  const dir = join(DATA_DIR, collection);
  await ensureDir(dir);
  const filepath = join(dir, `${id}.json`);
  await writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
}
async function deleteItem(collection, id) {
  const filepath = join(DATA_DIR, collection, `${id}.json`);
  if (existsSync(filepath)) {
    await unlink(filepath);
  }
}

export { deleteItem as d, getItems as g, saveItem as s };
