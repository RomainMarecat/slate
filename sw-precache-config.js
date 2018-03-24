module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/images/*',
    'dist/assets/images/hockey/*',
    'dist/assets/images/hockey/icons/*',
    'dist/assets/images/monpullmoche/icons/*',
    'dist/assets/images/monpullmoche/*',
    'dist/assets/images/menincar/icons/*',
    'dist/assets/images/menincar/*',
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/]
};
