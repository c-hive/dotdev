const withCSS = require('@zeit/next-css');

module.exports = {
  distDir: 'build',
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
};

module.exports = withCSS();
