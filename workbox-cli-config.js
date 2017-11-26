module.exports = {
  "globDirectory": "docs/",
  "globPatterns": [
    "**/*.{txt,png,ico,html,js,json,css}"
  ],
  "swDest": "docs/service-worker.js",
  "globIgnores": [
    "service-worker.js",
    "{android-chrome-*,apple-touch-icon,favicon-}.png",
    "**/assets/{icon,imgs}/*"
  ]
};
