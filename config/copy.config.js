// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
    copyIcons: {
      src: ['{{SRC}}/*.png'],
      dest: '{{WWW}}'
    },
    copyFavicon: {
      src: ['{{SRC}}/favicon.ico'],
      dest: '{{WWW}}'
    },
    copyWorkbox: {
      src: ['{{SRC}}/workbox-sw.prod.*.js'],
      dest: '{{WWW}}'
    }
  }