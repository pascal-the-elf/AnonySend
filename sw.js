console.log("[SW]: Loading WorkBox...");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
    console.log("[SW]: WorkBox Loaded");
}
workbox.routing.registerRoute(
    new RegExp('inbox'),
    workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache',
  })
);
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 1 * 24 * 60 * 60,
      })
    ],
  })
);
workbox.precaching.precacheAndRoute([
    "/",
    "/inbox",
    "/settings",
    "/resource/img/background/background.svg",
    "/resource/img/background/ocean.svg",
    "/resource/img/background/mountains.svg"
]);
