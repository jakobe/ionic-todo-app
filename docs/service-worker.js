importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const workboxSW = new self.WorkboxSW({
  "skipWaiting": true
});
const cacheFirstStrategy = workboxSW.strategies.cacheFirst();
workboxSW.router.registerRoute(new RegExp('/.*'), cacheFirstStrategy);
workboxSW.precache([
  {
    "url": "build/main.css",
    "revision": "f0f4c99cdacbb609d4c38457e5157973"
  },
  {
    "url": "build/main.js",
    "revision": "f11df398ff30981454429bcc1d24397f"
  },
  {
    "url": "build/polyfills.js",
    "revision": "443c697fc904cd88a651d09cf5c2fe2b"
  },
  {
    "url": "build/vendor.js",
    "revision": "1c259c28f807dd6a5e9e6c9a12204dd5"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "b5379073ef07ff2031249146437c6a47"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "58eec484bf79fb40728ce4a30050b25c"
  },
  {
    "url": "favicon.ico",
    "revision": "f63167d52ddcc7d7c40ca9b47ff583c3"
  },
  {
    "url": "index.html",
    "revision": "d96007736c97ddec82185d73b477e788"
  },
  {
    "url": "manifest.json",
    "revision": "c644e9c4ad81ccd90867dfa4bbaa52aa"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);

