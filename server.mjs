import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Body size limits (10MB for images, reasonable for a gallery site)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request timeout: 2 minutes (sufficient for uploads)
app.use((req, res, next) => {
    req.setTimeout(120000);
    res.setTimeout(120000);
    next();
});

// Use Astro's SSR handler
app.use(ssrHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});

server.timeout = 120000;
server.headersTimeout = 125000;
server.requestTimeout = 120000;

// Error handling with retry for port conflicts during deployment
let retryCount = 0;
const maxRetries = 5;

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && retryCount < maxRetries) {
        retryCount++;
        console.log(`Port ${port} in use, retrying in 3s... (${retryCount}/${maxRetries})`);
        setTimeout(() => {
            server.close();
            server.listen(port, host);
        }, 3000);
    } else {
        console.error('Server error:', error);
        process.exit(1);
    }
});

// Graceful shutdown
function gracefulShutdown(signal) {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });

    // Force close after 10s
    setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
    }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
