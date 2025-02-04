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


function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const manifest = self.__SW_MANIFEST;


const serwist = new Serwist({
  precacheEntries: manifest,
  precacheOptions: {
    // Whether outdated caches should be removed.
    cleanupOutdatedCaches: true,
    concurrency: 10,
    ignoreURLParametersMatching: [/.*/],
    // directoryIndex: null,
    // cleanURLs: true,
    // urlManipulation: ({ url }) => {
    //   const alteredUrl = new URL(url);
    //   console.log("URL Manipulation", alteredUrl.pathname);
    //   alteredUrl.searchParams.delete('_rsc');
    //   alteredUrl.search = "";
    //   return [alteredUrl];
    // },

    // fetchOptions:
    matchOptions: {
      ignoreSearch: true,
    }

    // precacheStrategyOptions
    // fetchOptions: precacheFetchOptions,
    // matchOptions: precacheMatchOptions,


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

const revision = guidGenerator();

serwist.addToPrecacheList([
  { url: "/", revision },
  { url: "/about", revision },
  { url: "/docs", revision },
])


self.addEventListener("install", (event) => {
  console.log("install", manifest);
})

// self.addEventListener("fetch", customFetchEventHandler);


async function customFetchEventHandler(event: FetchEvent) {

  const cache = await caches.open(serwist.precacheStrategy.cacheName);
  const url = new URL(event.request.url);
  const urlWithoutSearch = url.origin + url.pathname;


  const cacheMatch = await serwist.matchPrecache(urlWithoutSearch);

  console.log("fetch", {
    requestUrl: event.request.url,
    pathname: url.pathname,
    urlWithoutSearch: urlWithoutSearch,
    getPrecacheKeyForUrl: serwist.getPrecacheKeyForUrl(urlWithoutSearch),
    cacheMatch
  });

  event.respondWith(cacheMatch ?? Response.error());
};

// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);
//   if (url.origin === location.origin && url.pathname === "/test-precache") {
//     event.respondWith((async () => (await serwist.matchPrecache("/precached-file.html")) ?? Response.error())());
//   }
// });



serwist.addEventListeners();
