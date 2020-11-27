module.exports = {
    globDirectory: './public/',
    globPatterns: [
      '\*\*/\*.{html,js,css,svg,mp3,wav,png}'
    ],
    swDest: './public/my-sw.js',
    clientsClaim: true,
    skipWaiting: true
  };