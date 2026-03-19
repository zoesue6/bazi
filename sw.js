const CACHE_NAME = 'bazi-v1';
const urlsToCache =[
    './index.html',
    './manifest.json',
    './1.png',
    'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.min.js',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;900&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request);
            })
    );
});