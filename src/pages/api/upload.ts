import type { APIRoute } from 'astro';
import { createWriteStream } from 'fs';
import { mkdir, rename } from 'fs/promises';
import { join } from 'path';
import Busboy from 'busboy';
import { Readable } from 'stream';

export const POST: APIRoute = async ({ request }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('📥 Upload request received');

            const contentType = request.headers.get('content-type');
            console.log('📋 Content-Type:', contentType);

            if (!contentType || !contentType.includes('multipart/form-data')) {
                console.error('❌ Invalid content type:', contentType);
                resolve(new Response(JSON.stringify({ error: 'Invalid content type' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }));
                return;
            }

            // Determine upload directory based on environment
            const isProd = import.meta.env.PROD;
            const uploadsDir = isProd
                ? join(process.cwd(), 'uploads')
                : join(process.cwd(), 'public', 'uploads');

            const tempDir = join(uploadsDir, 'temp');

            // Create directories BEFORE starting busboy
            try {
                await mkdir(uploadsDir, { recursive: true });
                await mkdir(tempDir, { recursive: true });
                console.log('✅ Directories created:', { uploadsDir, tempDir });
            } catch (error) {
                console.error('❌ Failed to create directories:', error);
                resolve(new Response(JSON.stringify({
                    error: 'Failed to create upload directories',
                    details: error instanceof Error ? error.message : String(error)
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }));
                return;
            }

            const busboy = Busboy({ headers: { 'content-type': contentType } });

            let chunkIndex = 0;
            let totalChunks = 1;
            let filename = '';
            let fileWritten = false;
            let resolved = false;

            busboy.on('field', (fieldname, val) => {
                console.log(`📝 Field received: ${fieldname} = ${val}`);
                if (fieldname === 'chunkIndex') chunkIndex = parseInt(val);
                if (fieldname === 'totalChunks') totalChunks = parseInt(val);
                if (fieldname === 'filename') filename = val;
            });

            busboy.on('file', (fieldname, file, info) => {
                console.log(`📁 File received: ${fieldname}, filename: ${info.filename}`);

                if (fieldname !== 'file') {
                    file.resume();
                    return;
                }

                fileWritten = true;
                const tempFilePath = join(tempDir, filename || `upload-${Date.now()}`);
                console.log(`💾 Writing to: ${tempFilePath}, chunk ${chunkIndex}/${totalChunks - 1}`);

                const writeStream = createWriteStream(tempFilePath, { flags: 'a' });

                file.pipe(writeStream);

                writeStream.on('finish', async () => {
                    if (resolved) return; // Prevent multiple responses

                    try {
                        console.log(`✅ Chunk ${chunkIndex} written successfully`);

                        // If this is the last chunk, finalize the file
                        if (chunkIndex === totalChunks - 1) {
                            console.log('🎉 Last chunk received, finalizing file...');
                            const timestamp = Date.now();
                            const ext = filename.split('.').pop();
                            const finalFilename = `${timestamp}.${ext}`;
                            const finalPath = join(uploadsDir, finalFilename);

                            await rename(tempFilePath, finalPath);
                            console.log(`✅ File finalized: ${finalPath}`);

                            // In production, serve via API route; in dev, serve from public
                            const isProd = import.meta.env.PROD;
                            const imageUrl = isProd
                                ? `/api/images/${finalFilename}`
                                : `/uploads/${finalFilename}`;

                            resolved = true;
                            resolve(new Response(JSON.stringify({
                                success: true,
                                url: imageUrl,
                                filename: finalFilename,
                                completed: true
                            }), {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            }));
                        } else {
                            console.log(`✅ Chunk ${chunkIndex} complete, waiting for more...`);
                            resolved = true;
                            resolve(new Response(JSON.stringify({
                                success: true,
                                chunkIndex,
                                completed: false
                            }), {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            }));
                        }
                    } catch (error) {
                        console.error('❌ File finalization error:', error);
                        resolved = true;
                        resolve(new Response(JSON.stringify({
                            error: 'File finalization failed',
                            details: error instanceof Error ? error.message : String(error)
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' }
                        }));
                    }
                });

                writeStream.on('error', (error) => {
                    if (resolved) return;
                    console.error('❌ Write stream error:', error);
                    resolved = true;
                    resolve(new Response(JSON.stringify({
                        error: 'Write failed',
                        details: error.message
                    }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                });
            });

            busboy.on('error', (error) => {
                if (resolved) return;
                console.error('❌ Busboy error:', error);
                resolved = true;
                resolve(new Response(JSON.stringify({
                    error: 'Upload parsing failed',
                    details: error instanceof Error ? error.message : String(error)
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }));
            });

            busboy.on('finish', () => {
                console.log('🏁 Busboy finished parsing');
                if (!fileWritten && !resolved) {
                    resolved = true;
                    resolve(new Response(JSON.stringify({ error: 'No file uploaded' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                }
            });

            // Convert Web ReadableStream to Node.js Readable stream
            const nodeStream = Readable.fromWeb(request.body as any);
            nodeStream.pipe(busboy);

        } catch (error) {
            console.error('❌ Upload error:', error);
            resolve(new Response(JSON.stringify({
                error: 'Upload fehlgeschlagen',
                details: error instanceof Error ? error.message : String(error)
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
    });
};
