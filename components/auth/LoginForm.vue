<template>
  <div>
    <form class="form-cont" @submit.prevent="onLogin('basic')">
      <div class="loading-spinner">
        <loading-spinner :loading="loading" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          class="form-control"
          :class="{'is-invalid': errors.username}"
          @input="errorReset('username')"
          @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.username" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-group input-group-password">
          <input
            id="password"
            v-model.trim="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            :class="{'is-invalid': errors.password}"
            @input="errorReset('password')"
            @focus="resetError()"
          />
          <div class="input-group-append">
            <div
              class="btn"
              :class="{ active: showPassword }"
              @click="showPassword = !showPassword"
            >
              <lx-svg-icon icon="eye" w="20" h="20"></lx-svg-icon>
            </div>
          </div>
          <div class="invalid-feedback">
            <div v-for="error in itemErrors['password']" :key="error">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
      <div class="form-group form-check-simple my-3">
        <input id="rememberme" type="checkbox" class="form-check-input" />
        <label for="rememberme" class="form-check-label">
          Remember me
        </label>
      </div>
      <button type="submit" class="btn btn-login form-control">
        Login
      </button>
    </form>
    <div class="divider-or">
      Or
    </div>
    <div class="form-group">
      <button
        class="btn btn-auth-social btn-facebook form-control"
        @click="onLogin('facebook')"
      >
        <div />
        Login with Facebook
      </button>
    </div>
    <div class="form-group">
      <button
        class="btn btn-auth-social btn-google form-control"
        @click="onLogin('google')"
      >
        <div />
        Login with Google
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon },

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errors: {
        username: null,
        password: null
      }
    }
  },

  computed: {
    ...mapState('ui', ['loading']),
    ...mapState('ui', ['itemErrors'])
  },

  methods: {
    ...mapMutations('ui', ['SET_LOADING']),
    ...mapMutations('ui', ['RESET_ITEM_ERRORS']),
    onLogin(method) {
      if (method === 'basic') {
        this.$store.dispatch('auth/login', {
          method: 'basic',
          data: {
            username: this.email,
            password: this.password
          }
        })
      } else if (method === 'google') {
        this.$googleAuth().signIn((authorizationCode) => {
          this._login(method, { code: authorizationCode })
        }, (e) => {
          console.log(e, e.response)
        })
      } else if (method === 'facebook') {
        this.$facebookAuth().getLoginStatus().then((response) => {
          if (response.status === 'connected') {
            this._login(method, { code: response.authResponse.accessToken })
          } else {
            this.$facebookAuth().signIn({ scope: 'email' }).then((response) => {
              this._login(method, { code: response.authResponse.accessToken })
            })
          }
        }, (e) => {
          console.log(e, e.response)
        })
      }
    },

    errorReset(field) {
      Vue.set(this.errors, field, null)
    },

    resetError(property) {
        this.RESET_ITEM_ERRORS()
    },


    _login(method, data) {

      this.$store.dispatch('auth/login', {
          method: method,
          data: data
      });
      // OLD DATA
//      this.$auth.loginWith('local', {
//        data: { method, data }
//      }).catch((e) => {
//        if (e.response && e.response.data) this.errors = e.response.data
//        else console.log(e, e.response)
//      })
    }
  }
}
</script>

<style lang="scss">
.loading-spinner {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.801);
}

.form-cont {
  position: relative;
}
</style>
