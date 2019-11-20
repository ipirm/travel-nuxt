import Vue from 'vue'

export default function ({ app }) {
  const getLocalePath = (to) => {
    const path = to === '/' ? '' : to
    const isPrefix = to.slice(1).split('/')[0].length === 2
    const isNeedPrefix = app.i18n.locale === app.i18n.defaultLocale
    const prefixLocale = isNeedPrefix ? '' : `/${app.i18n.locale}`

    if (isPrefix) {
      return to
    }
    if (!prefixLocale) {
      return to
    }
    return prefixLocale + path
  }

  Vue.component('i18n-link', {
    name: 'I18nLink',
    functional: true,
    render(h, { data, children, props }) {
      return h('nuxt-link', {
        ...data,
        attrs: {
          ...data.attrs,
          to: getLocalePath(props.to)
        }
      }, children)
    }
  })
}
