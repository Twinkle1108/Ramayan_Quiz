self.addEventListener("install", e => {
  console.log("Service Worker installed");
  e.waitUntil(
    caches.open("ramayan-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json",
        "images/icon-192.png",
        "images/icon-512.png"
        // add any images/audio/fonts if needed
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
