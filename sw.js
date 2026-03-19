const CACHE_NAME = 'bazi-v2';
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
    // 强制立即接管控制权
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    // 清理旧版本缓存，保证每次发版更新
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
                // 如果缓存中有，就直接返回缓存
                if (response) return response;
                // 否则发起网络请求
                return fetch(event.request);
            })
    );
});
