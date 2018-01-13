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
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};
