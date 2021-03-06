module.exports = {
  mode: 'spa',
  head: {
    title: 'a-repo-story',
    link: [
      {
        href: '~/assets/font/SourceCodePro-Regular.otf',
        rel: 'stylesheet'
      }
    ]
  }, // Headers of the page
  loading: false, // Disable default loading bar
  build: {
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
        // Extend only webpack config for client-bundle
        if (isClient) {
          config.devtool = '#source-map';
        }
      }
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.target = 'electron-renderer';
      }
    }
  },
  dev: process.env.NODE_ENV === 'DEV',
  css: [
    '@/assets/css/global.css'
  ],
  plugins: [
    '~/plugins/git'
  ]
};
