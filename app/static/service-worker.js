const CACHE_NAME = 'flask-app-cache-v1';

const FILES_TO_CACHE = [
  '/static/offline.html',
  '/static/css/base.css',
  '/index',  
];

self.addEventListener('install', (evt) => {
  console.log('Installing Service Worker');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching pages for offline use');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('Activating Service Worker');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});