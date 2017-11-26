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
const fileManifest = [
  {
    "url": "build/main.css",
    "revision": "1ce7d89bf541c3deca0ceac44d15b91e"
  },
  {
    "url": "build/main.js",
    "revision": "7bf7ce86e178784fd5abdb841c62148c"
  },
  {
    "url": "build/polyfills.js",
    "revision": "a0f85bbdf3767a0ba06226c4ba43053f"
  },
  {
    "url": "build/vendor.js",
    "revision": "d03aff83c5d6a95ba2196b496a194774"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "e4cf943a61395f00b8142509c50f358b"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "704f843114c46926df788af89bef96ff"
  },
  {
    "url": "favicon.ico",
    "revision": "01e28adca754a6082ac7430b470c0661"
  },
  {
    "url": "index.html",
    "revision": "34e4647172ec5c0437d066f051ccfec5"
  },
  {
    "url": "manifest.json",
    "revision": "d4aa2e2bbe4298dc470269c49a731013"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
