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

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
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

// {
//   matcher: /^https:\/\/attendee(?:\?.*)?$/i,
//   handler: new CacheFirst({
//     cacheName: "attendee-ticket-detail",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 4,
//         maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
//         maxAgeFrom: "last-used",
//       }),
//     ],
//   }),
// },

serwist.addEventListeners();
