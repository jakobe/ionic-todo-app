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
    "revision": "1ce7d89bf541c3deca0ceac44d15b91e"
  },
  {
    "url": "build/main.js",
    "revision": "4a38d82e6bb90c4499f36aba1d5059bf"
  },
  {
    "url": "build/polyfills.js",
    "revision": "a0f85bbdf3767a0ba06226c4ba43053f"
  },
  {
    "url": "build/vendor.js",
    "revision": "62560ebebde8617a236597ae8aafadba"
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
    "revision": "65077db1f32708514e9ea187563959c2"
  },
  {
    "url": "manifest.json",
    "revision": "195d6c5f46da43d19d2dad5f43c0adf8"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);

