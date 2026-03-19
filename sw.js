const CACHE_NAME = 'bazi-v3'; // <--- 关键在这里：每次更新代码，把这个数字加 1
const urlsToCache =[
    './',
    './index.html',
    './manifest.json',
    './1.png',
    './icon.png',
    'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.min.js',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;900&display=swap'
];

self.addEventListener('install', event => {
    // 强制新版本立即接管控制权
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    // 激活新版本时，清理掉所有的旧版本缓存
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
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
