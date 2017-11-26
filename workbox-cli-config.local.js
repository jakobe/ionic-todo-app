module.exports = {
  "globDirectory": "www/",
  "globPatterns": [
    "**/*.{txt,png,ico,html,js,json,css}"
  ],
  "swSrc": "src/service-worker.js",
  "swDest": "www/service-worker.js",
  "globIgnores": [
    "service-worker.js",
    "{android-chrome-*,apple-touch-icon,favicon-}.png",
    "**/assets/{icon,imgs}/*"
  ]
};
