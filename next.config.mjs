// @ts-check
import withSerwistInit from "@serwist/next";
import crypto from "crypto";

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

function getStaticPrecacheEntries() {
  // build list of manifest entries to precache content of public folder
  return [];
}

function getGeneratedPrecacheEntries(buildId) {
  // build list of page entries, using buildId as revision for HTML files and as part of the url for JSON files
  return [];
}

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // additionalPrecacheEntries: [
  //   // ...getGeneratedPrecacheEntries(revision),
  //   { url: "/docs", revision },
  //   { url: "/about", revision },
  //   { url: "/boatsQuery", revision },
  //   { url: "/manifest.json", revision },
  // ],
  additionalPrecacheEntries: [
    { url: "/~offline", revision },
    { url: "/boatsQuery*", revision },
    { url: "/docs", revision },
    { url: "/about", revision },
    { url: "/manifest.json", revision },
  ],
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
