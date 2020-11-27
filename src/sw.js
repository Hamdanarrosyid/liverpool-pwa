importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

if (workbox) {
  console.log('ada worker');
} else {
  console.log('tidak ada worker');
}
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/app.bundle.js', revision: '1' },
  { url: '/idb.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/materializecss.bundle.js', revision: '1' },
  { url: '/materializejs.bundle.js', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/icon/icon-512x512.png', revision: '1' },
  { url: '/icon/icon-192x192.png', revision: '1' },
  { url: '/favicon/apple-icon-72x72.png', revision: '1' },
  { url: '/favicon/apple-icon-144x144.png', revision: '1' },
  { url: '/favicon/favicon-32x32.png', revision: '1' },
  { url: '/favicon/favicon-96x96.png', revision: '1' },
  { url: '/favicon/favicon-16x16.png', revision: '1' },
  { url: '/favicon/ms-icon-144x144.png', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
  { url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/merriweather/v22/u-4n0qyriQwlOrhSvowK_l52xwNZWMf6.woff2', revision: '1' },
]);

registerRoute(
  new RegExp('/index.html'),
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/api\.football-data\.org\/v2/,
  new CacheFirst({
    cacheName: 'footbal data',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body,
    icon: 'icon/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});
