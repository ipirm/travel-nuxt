import i18nConfig from './config/i18n'
import serverConfig from './config/server'

export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'universal',
  router: {
    middleware: 'header'
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: ['@/assets/scss/main.scss'],

  plugins: [
    { src: '~/plugins/common-ui', mode: 'client' },
    { src: '~/plugins/vue-google-oauth', mode: 'client' },
    { src: '~/plugins/vue-facebook-oauth', mode: 'client' },
    { src: '~/plugins/vue-notification', mode: 'client' },
    { src: '~/plugins/vue2-smooth-scroll', mode: 'client' },
    { src: '~/plugins/vue-slider-component', mode: 'client' },
    { src: '~/plugins/date-picker', mode: 'client' },
    { src: '~/plugins/vue-debounce', mode: 'client' },
    { src: '~/plugins/v-calendar', mode: 'client'},
    { src: '~/plugins/vue-mj-datepicker', mode: 'client'},
    { src: '~/plugins/i18n-link' }
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n',
    'nuxt-leaflet',
  //  '@nuxtjs/eslint-module'
  ],

  i18n: i18nConfig,

  axios: {
    proxy: true
  },

  env: {
    domain: process.env.BASE_URL || 'http://localhost:8000'
  },

  proxy: {
    '/api/': { target: serverConfig.defaultApiURL, pathRewrite: { '^/api/': '' } },
    '/uploads/': { target: serverConfig.defaultUploadURL }
  },

  build: {
    extractCSS: true,
    extend(config, ctx) {}
  }
}
