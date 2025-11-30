import { readFile, writeFile, mkdir, readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_DIR = join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDir(dir: string) {
    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }
}

export interface Workshop {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    materials: string[];
    price: number;
    image: string;
    bookingEnabled: boolean;
}

export interface Artwork {
    id: string;
    title: string;
    description: string;
    technique: string;
    size: {
        width: number;
        height: number;
        unit: string;
    };
    availability: 'available' | 'reserved' | 'sold';
    price: string;
    images: string[];
    tags: string[];
    featured: boolean;
    createdDate: string;
}

export interface Review {
    id: string;
    name: string;
    email?: string;
    rating: number; // 1-5
    text: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

export async function getItems<T>(collection: 'workshops' | 'artworks' | 'reviews'): Promise<T[]> {
    const dir = join(DATA_DIR, collection);
    await ensureDir(dir);

    const files = await readdir(dir);
    const items: T[] = [];

    for (const file of files) {
        if (file.endsWith('.json')) {
            try {
                const content = await readFile(join(dir, file), 'utf-8');
                const item = JSON.parse(content);
                // Ensure ID is set from filename if missing
                if (!item.id) {
                    item.id = file.replace('.json', '');
                }
                items.push(item);
            } catch (err) {
                console.error(`Error reading ${collection} item ${file}:`, err);
            }
        }
    }

    return items;
}

export async function getItem<T>(collection: 'workshops' | 'artworks' | 'reviews', id: string): Promise<T | null> {
    const filepath = join(DATA_DIR, collection, `${id}.json`);
    try {
        if (!existsSync(filepath)) return null;
        const content = await readFile(filepath, 'utf-8');
        const item = JSON.parse(content);
        item.id = id;
        return item;
    } catch (err) {
        console.error(`Error reading ${collection} item ${id}:`, err);
        return null;
    }
}

export async function saveItem<T>(collection: 'workshops' | 'artworks' | 'reviews', id: string, data: T): Promise<void> {
    const dir = join(DATA_DIR, collection);
    await ensureDir(dir);
    const filepath = join(dir, `${id}.json`);
    await writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function deleteItem(collection: 'workshops' | 'artworks' | 'reviews', id: string): Promise<void> {
    const filepath = join(DATA_DIR, collection, `${id}.json`);
    if (existsSync(filepath)) {
        await unlink(filepath);
    }
}

// Review-specific functions
export async function approveReview(id: string): Promise<void> {
    const review = await getItem<Review>('reviews', id);
    if (review) {
        review.status = 'approved';
        await saveItem('reviews', id, review);
    }
}

export async function rejectReview(id: string): Promise<void> {
    const review = await getItem<Review>('reviews', id);
    if (review) {
        review.status = 'rejected';
        await saveItem('reviews', id, review);
    }
}
