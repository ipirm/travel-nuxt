import Vue from 'vue'

let config = null
const FacebookAuth = {
  install: function (Vue, options) {
    Vue.facebookAuth = facebookAuth
    Vue.prototype.$facebookAuth = facebookAuth
    if (typeof options === 'object') {
      config = Object.assign(options)
    }
  }
}

const facebookAuth = () => {
  return {
    load: function (appId, version) {
      return new Promise((resolve) => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: config.appId,
            xfbml: false,
            version: config.version,
            cookie: true
          })
          window.FB.AppEvents.logPageView()
          resolve('SDK Loaded!')
        };
        (function (d, s, id) { // eslint-disable-line func-names
          const fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return }
          const js = d.createElement(s); js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
      })
    },

    signIn: function (options) {
      return new Promise((resolve) => {
        window.FB.login(response => resolve(response), options)
      })
    },

    signOut: function () {
      return new Promise((resolve) => {
        window.FB.logout(response => resolve(response))
      })
    },
    getLoginStatus: function () {
      return new Promise((resolve) => {
        window.FB.getLoginStatus((responseStatus) => {
          resolve(responseStatus)
        })
      })
    }
  }
}

Vue.use(FacebookAuth, { appId: '2291004327650429', version: 'v3.1' })
