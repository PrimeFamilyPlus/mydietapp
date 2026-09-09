const CACHE_NAME = 'diet-app-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝時快取檔案，讓 App 可以離線開啟
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 每次開啟 App 時讀取快取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});