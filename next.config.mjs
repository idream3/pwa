// @ts-check
import withSerwistInit from "@serwist/next";
import crypto from "crypto";
import { globSync } from "glob";
import path from "node:path";
import { InjectManifest, GenerateSW } from "workbox-webpack-plugin";

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.

const publicDir = path.resolve("/", "public");

const revision = crypto.randomUUID();

// function getStaticPrecacheEntries() {

//   const publicScan = globSync(["**/*"], {
//     nodir: true,
//     cwd: publicDir,
//     ignore: ["swe-worker-*.js"],
//   });
//   const entries = publicScan.map((f) => ({
//     url: path.posix.join(basePath, f),
//     revision,
//   }));
//   return [];
// }

function getGeneratedPrecacheEntries(buildId) {
  // build list of page entries, using buildId as revision for HTML files and as part of the url for JSON files
  return [];
}

const withSerwist = withSerwistInit({
  cacheOnNavigation: false,
  swSrc: "./sw.ts",
  swDest: "public/sw.js",
  reloadOnOnline: false,
  exclude: [/dynamic-css-manifest\.json$/],
  // additionalPrecacheEntries: [
  //   { url: "/about", revision },
  //   { url: "/docs", revision },
  //   { url: "/manifest.json", revision },
  // ],
  //   // ...getGeneratedPrecacheEntries(revision),
  //   { url: "/docs", revision },
  //   { url: "/about", revision },
  //   { url: "/boatsQuery", revision },
  //   { url: "/manifest.json", revision },
  // ],
  // additionalPrecacheEntries: [
  //   { url: "/~offline", revision },
  //   { url: "/boatsQuery*", revision },
  //   { url: "/docs", revision: null },
  //   { url: "/about", revision: null },
  //   { url: "/manifest.json", revision },
  // ],
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webpack(config, _options) {

  //   config.plugins.push(
  //       new GenerateSW({
  //         // These are some common options, and not all are required.
  //         // Consult the docs for more info.
  //         exclude: [/.../, '...'],
  //         maximumFileSizeToCacheInBytes: ...,
  //         navigateFallback: '...',
  //         runtimeCaching: [{
  //           // Routing via a matchCallback function:
  //           urlPattern: ({request, url}) => ...,
  //           handler: '...',
  //           options: {
  //             cacheName: '...',
  //             expiration: {
  //               maxEntries: ...,
  //             },
  //           },
  //         }, {
  //           // Routing via a RegExp:
  //           urlPattern: new RegExp('...'),
  //           handler: '...',
  //           options: {
  //             cacheName: '...',
  //             plugins: [..., ...],
  //           },
  //         }],
  //         skipWaiting: true,
  //       }),
  //   );

  //   return config;
  // },
};

// export default nextConfig;
export default withSerwist(nextConfig);
