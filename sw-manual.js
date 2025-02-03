const assets = [
  "/about",
  "/_next/static/chunks/app/about/page.js",
  "/dog.jpeg",
  "/cat.jpeg",
  "/",
  "/_next/static/chunks/app-pages-internals.js",
  "/_next/static/chunks/main-app.js?v=1738540512108",
  "/_next/static/chunks/webpack.js?v=1738540512108",
  "/_next/static/chunks/app/page.js",
];

self.addEventListener("install", (event) => {
  console.log("V1 installing…");
  self.skipWaiting();

  // cache a cat SVG
  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      assets.forEach((url) => {
        console.log("Adding url to cache", url);
        cache.add(url).catch(console.error);
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
  // self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  console.log("SW fetch", url.pathname);

  event.respondWith(
    caches.match(url.pathname).then((response) => {
      console.log("SW respond with ", response);

      if (response) {
        // Return cached response if found
        return response;
      }
      // If not in cache, try network
      return fetch(event.request).catch((error) => {
        // If offline and not cached, could return a custom offline page
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
        // Or return a specific error for assets
        return new Response("Not available offline", {
          status: 404,
          statusText: "Not Found",
        });
      });
    })
  );

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  // if (url.origin == location.origin && url.pathname == "/dog.jpeg") {
  //   event.respondWith(
  //     caches.match("/cat.jpeg").then((response) => {
  //       console.log("cat response", response);
  //       if (response) {
  //         return response;
  //       }

  //       return new Response("Cat SVG not found in cache", {
  //         status: 404,
  //         statusText: "Not Found",
  //       });
  //     })
  //   );
  // }
});
