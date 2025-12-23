import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';

// Hetzner Object Storage Config
const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT || 'https://nbg1.your-objectstorage.com',
    region: process.env.S3_REGION || 'nbg1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    forcePathStyle: true, // Wichtig für Hetzner
});

const BUCKET = process.env.S3_BUCKET || 'danapfel-digital';
const PREFIX = 'atelierkl'; // Prefix für alle AtelierKL-Daten

export interface S3Image {
    name: string;
    url: string;
    size: number;
    date: Date;
}

// Upload file to S3
export async function uploadToS3(
    filename: string,
    buffer: Buffer,
    contentType: string
): Promise<string> {
    const key = `${PREFIX}/uploads/${filename}`;

    await s3Client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: buffer,
            ContentType: contentType,
            ACL: 'public-read',
        })
    );

    // Return public URL
    const endpoint = process.env.S3_ENDPOINT || '';
    return `${endpoint}/${BUCKET}/${key}`;
}

// Delete file from S3
export async function deleteFromS3(filename: string): Promise<void> {
    const key = `${PREFIX}/uploads/${filename}`;

    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: key,
        })
    );
}

// Get file from S3
export async function getFromS3(filename: string): Promise<{ buffer: Buffer; contentType: string } | null> {
    const key = `${PREFIX}/uploads/${filename}`;

    try {
        const response = await s3Client.send(
            new GetObjectCommand({
                Bucket: BUCKET,
                Key: key,
            })
        );

        const chunks: Uint8Array[] = [];
        for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
            chunks.push(chunk);
        }

        return {
            buffer: Buffer.concat(chunks),
            contentType: response.ContentType || 'application/octet-stream',
        };
    } catch {
        return null;
    }
}

// List all images in S3
export async function listImagesFromS3(): Promise<S3Image[]> {
    const response = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: `${PREFIX}/uploads/`,
        })
    );

    if (!response.Contents) return [];

    const endpoint = process.env.S3_ENDPOINT || '';

    return response.Contents
        .filter((obj) => obj.Key && !obj.Key.endsWith('/'))
        .map((obj) => ({
            name: obj.Key!.replace(`${PREFIX}/uploads/`, ''),
            url: `${endpoint}/${BUCKET}/${obj.Key}`,
            size: obj.Size || 0,
            date: obj.LastModified || new Date(),
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export { s3Client, BUCKET, PREFIX };

