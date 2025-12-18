// Service Worker for Performance Optimization
const CACHE_NAME = 'atelierkl-v1';
const STATIC_CACHE = 'atelierkl-static-v1';
const IMAGE_CACHE = 'atelierkl-images-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/atelier5.png',
    '/logo-kl.png',
    '/hintergrund.webp'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME && name !== STATIC_CACHE && name !== IMAGE_CACHE)
                    .map(name => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip admin and API routes
    if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) {
        return;
    }

    // Handle images with cache-first strategy
    if (request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE).then(cache => {
                return cache.match(request).then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request).then(networkResponse => {
                        // Only cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // Handle other requests with network-first strategy
    event.respondWith(
        fetch(request)
            .then(response => {
                // Clone the response
                const responseClone = response.clone();
                
                // Cache successful responses
                if (response && response.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                
                return response;
            })
            .catch(() => {
                // Fallback to cache if network fails
                return caches.match(request);
            })
    );
});

