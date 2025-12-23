import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';

// S3 Client für Hetzner Object Storage
const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT || 'https://nbg1.your-objectstorage.com',
    region: process.env.S3_REGION || 'nbg1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    forcePathStyle: true,
});

const BUCKET = process.env.S3_BUCKET || 'danapfel-digital';
const PREFIX = 'atelierkl'; // Prefix für alle AtelierKL-Daten

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

// Helper: S3 Objekt lesen
async function getS3Object(key: string): Promise<string | null> {
    try {
        const response = await s3Client.send(
            new GetObjectCommand({ Bucket: BUCKET, Key: key })
        );
        const chunks: Uint8Array[] = [];
        for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks).toString('utf-8');
    } catch {
        return null;
    }
}

// Helper: S3 Objekt schreiben
async function putS3Object(key: string, content: string): Promise<void> {
    await s3Client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: content,
            ContentType: 'application/json',
        })
    );
}

// Helper: S3 Objekt löschen
async function deleteS3Object(key: string): Promise<void> {
    await s3Client.send(
        new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
    );
}

export async function getItems<T>(collection: 'workshops' | 'artworks' | 'reviews'): Promise<T[]> {
    try {
        const response = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: BUCKET,
                Prefix: `${PREFIX}/data/${collection}/`,
            })
        );

        if (!response.Contents) return [];

        const items: T[] = [];

        for (const obj of response.Contents) {
            if (obj.Key && obj.Key.endsWith('.json')) {
                const content = await getS3Object(obj.Key);
                if (content) {
                    try {
                        const item = JSON.parse(content);
                        if (!item.id) {
                            item.id = obj.Key.split('/').pop()?.replace('.json', '');
                        }
                        items.push(item);
                    } catch (err) {
                        console.error(`Error parsing ${obj.Key}:`, err);
                    }
                }
            }
        }

        return items;
    } catch (err) {
        console.error(`Error listing ${collection}:`, err);
        return [];
    }
}

export async function getItem<T>(collection: 'workshops' | 'artworks' | 'reviews', id: string): Promise<T | null> {
    const key = `${PREFIX}/data/${collection}/${id}.json`;
    const content = await getS3Object(key);

    if (!content) return null;

    try {
        const item = JSON.parse(content);
        item.id = id;
        return item;
    } catch (err) {
        console.error(`Error parsing ${key}:`, err);
        return null;
    }
}

export async function saveItem<T>(collection: 'workshops' | 'artworks' | 'reviews', id: string, data: T): Promise<void> {
    const key = `${PREFIX}/data/${collection}/${id}.json`;
    await putS3Object(key, JSON.stringify(data, null, 2));
}

export async function deleteItem(collection: 'workshops' | 'artworks' | 'reviews', id: string): Promise<void> {
    const key = `${PREFIX}/data/${collection}/${id}.json`;
    await deleteS3Object(key);
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
