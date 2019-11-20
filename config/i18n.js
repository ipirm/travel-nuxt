export default {
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en.js'
    },
    {
      code: 'de',
      name: 'Deutsch',
      iso: 'de-BE',
      file: 'de.js'
    },
    {
      code: 'fr',
      name: 'Français',
      iso: 'fr-FR',
      file: 'fr.js'
    },
    {
      code: 'es',
      name: 'Español',
      iso: 'es-ES',
      file: 'es.js'
    }
  ],
  langDir: 'locales/',
  lazy: true,
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'en-US'
  },
  defaultLocale: 'en'
}
