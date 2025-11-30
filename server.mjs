import { handler as ssrHandler } from './server/entry.mjs';
import express from 'express';

const app = express();

// Increase body size limit to 100MB
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Increase timeout to 10 minutes
app.use((req, res, next) => {
    req.setTimeout(600000); // 10 minutes
    res.setTimeout(600000); // 10 minutes
    next();
});

// Use Astro's SSR handler
app.use(ssrHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = app.listen(port, host, () => {
    console.log(`🚀 Server running at http://${host}:${port}`);
});

// Set server timeout to 10 minutes
server.timeout = 600000;
server.headersTimeout = 610000;
server.requestTimeout = 600000;

