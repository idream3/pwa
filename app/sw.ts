import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const manifest = self.__SW_MANIFEST;


const serwist = new Serwist({
  precacheEntries: manifest,
  precacheOptions: {
    // Whether outdated caches should be removed.
    cleanupOutdatedCaches: true,
    concurrency: 10,
    ignoreURLParametersMatching: [/.*/],
    directoryIndex: null,
    cleanURLs: true,
    urlManipulation: ({ url }) => {
      const alteredUrl = new URL(url);
      console.log("URL Manipulation", alteredUrl);
      return [alteredUrl];
    },
  },
  disableDevLogs: true,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// const revision = crypto.randomUUID();

serwist.addToPrecacheList([
  { url: "/", revision: null },
  { url: "/about", revision: null },
  { url: "/docs", revision: null },
])


self.addEventListener("install", (event) => {
  console.log("install", manifest);
})

self.addEventListener("fetch", async (event) => {
  const cache = await caches.open(serwist.precacheStrategy.cacheName);

  const url = new URL(event.request.url);
  console.log("fetch", { pathname: url.pathname, url: event.request.url, getPrecacheKeyForUrl: serwist.getPrecacheKeyForUrl(event.request.url) });

  console.log("fetch cache response", (await serwist.matchPrecache(event.request.url)))



  // if (url.origin === location.origin && url.pathname === "/test-precache") {
  //   const cacheKey = serwist.getPrecacheKeyForUrl("/precached-file.html");
  //   if (cacheKey) {
  //     event.respondWith((async () => (await cache.match(cacheKey)) ?? Response.error())());
  //   }
  // }
});

// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);
//   if (url.origin === location.origin && url.pathname === "/test-precache") {
//     event.respondWith((async () => (await serwist.matchPrecache("/precached-file.html")) ?? Response.error())());
//   }
// });



serwist.addEventListeners();
