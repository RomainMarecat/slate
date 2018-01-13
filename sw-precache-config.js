module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/images/*',
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};
