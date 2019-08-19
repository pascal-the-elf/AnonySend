self.addEventListener('install', event => {
    console.log('[Service Worker] Service Worker Loaded', event);
});

self.addEventListener('fetch', event => {
    event.respondWith(async function() {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        else return fetch(event.request);
    }());
});
