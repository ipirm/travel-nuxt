<template>
  <div class="page login-page">
    <nuxt-link to="/" class="logo logo-w"></nuxt-link>
    <div class="overlay">
      <div class="card card-auth">
        <div class="card-body">
          <h4 class="card-title">
            New password
          </h4>
        </div>

        <div class="form-group">
          <p class="card-text font-weight-medium description-password">
            Enter your new password.
          </p>
        </div>

        <div class="form-group">
          <label for="password">New password</label>
          <div class="input-group input-group-password">
            <input
              id="password"
              v-model.trim="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              :class="{'is-invalid': errors.password}"
              @input="errorReset('password')"
            />
            <div class="input-group-append">
              <div
                class="btn"
                :class="{ active: showPassword }"
                @click="showPassword = !showPassword"
              >
                <lx-svg-icon class="icon-eye" icon="eye" w="20" h="20"></lx-svg-icon>
              </div>
            </div>
            <div class="invalid-feedback">
              <div v-for="error in errors.password" :key="error">
                {{ error }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Repeat password</label>
          <div class="input-group input-group-password">
            <input
              id="repeatPassword"
              v-model.trim="repeatPassword"
              :type="showRepeatPassword ? 'text' : 'password'"
              class="form-control"
              :class="{'is-invalid': errors.repeatPassword}"
              @input="errorReset('password')"
            />
            <div class="input-group-append">
              <div
                class="btn"
                :class="{ active: showRepeatPassword }"
                @click="showRepeatPassword = !showRepeatPassword"
              >
                <lx-svg-icon class="icon-eye" icon="eye" w="20" h="20"></lx-svg-icon>
              </div>
            </div>
            <div class="invalid-feedback">
              <div v-for="error in errors.repeatPassword" :key="error">
                {{ error }}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-signup form-control" @click="setPassword" @keyup.enter="setPassword">
          Send
        </button>

        <nuxt-link to="/" class="go-home">
          Go home
        </nuxt-link>

        <div v-if="loading" class="loading-spinner-bg">
          <h5 v-if="isSuccessfully">
            Successfully!
          </h5>
          <loading-spinner :loading="true" class="loading-spinner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  layout: 'auth',
  auth: false,
  components: { LxSvgIcon },
  validate({ route, router }) {
    return route.fullPath.split('=')[1]
  },
  data: () => ({
    errors: {
      password: null,
      repeatPassword: null
    },
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
    loading: false,
    token: '',
    isSuccessfully: false
  }),
  mounted() {
    this.token = this.$route.fullPath.split('=')[1]
  },
  methods: {
    async setPassword() {
      if (this.password !== this.repeatPassword) {
        Vue.set(this.errors, 'repeatPassword', ['Password mismatch'])
        return
      }

      this.loading = true

      try {
        await this.$axios.$post('/api/customer/reset-password', { token: this.token, password: this.password })
        this.isSuccessfully = true
        setTimeout(this.$router.push('/auth/login'), 3500)
        this.$notify({
          type: 'success',
          group: 'settings',
          title: 'Success',
          text: 'Password updated successfully!',
          duration: 3500,
          speed: 1000
        })
      } catch (err) {
        console.log(err)
      }

      this.loading = false
    },
    errorReset(field) {
      Vue.set(this.errors, field, null)
    }
  }
}
</script>

<style lang="scss" scoped>
.description-password {
  justify-content: center;
  display: flex;
}

.loading-spinner-bg {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: -30px;
  margin-left: -30px;
  background-color: rgba(255, 255, 255, 0.801);
}

.loading-spinner {
  margin-top: -0.5rem;
  margin-bottom: 2rem;
}

.go-home {
  color: #2980b9;
  font-weight: 500;
  font-size: 13px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.icon-eye {
  cursor: pointer;
}
</style>
