const CACHE_NAME = 'my-cache-v1';
const assetsToCache = [
  'index.html',
  'index.js',
  'styles.css',
  'assets/aboutbg.webp',
  'assets/FA.webp',
  'assets/landing.webp',
  'assets/logo.png',
  'assets/Ongage.webp',
  'assets/skillsbg.webp',
  'assets/projectbg.webp',
];

// Install Service Worker and Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    }),
  );
});

// Fetch from Cache or Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      } else {
        return fetch(event.request).then((response) => {
          // Cache the new resources
          if (event.request.url.indexOf('/assets/') !== -1) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        });
      }
    }),
  );
});

// Activate the Service Worker and Clean Old Caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
