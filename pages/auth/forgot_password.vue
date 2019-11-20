<template>
  <div class="page login-page">
    <nuxt-link to="/" class="logo logo-w"></nuxt-link>
    <div class="overlay">
      <div class="card card-auth">
        <div class="card-body">
          <h4 class="card-title">
            Forgot password
          </h4>
        </div>

        <div class="form-group">
          <p class="card-text font-weight-medium description-email">
            Enter your email address. We will send you a confirmation email.
          </p>

          <label for="email">Email</label>

          <div class="input-group input-group-email">
            <input
              id="email"
              v-model="email"
              class="form-control"
              :class="{'is-invalid': errors.email}"
              @input="errorReset('email')"
            />
          </div>
          <div v-for="error in errors.email" :key="error" class="error-input">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-signup form-control" @click="requestEmail" @keyup.enter="requestEmail">
            Send
          </button>

          <nuxt-link to="/" class="go-home">
            Go home
          </nuxt-link>
        </div>

        <div v-if="loading" class="loading-spinner-bg">
          <loading-spinner :loading="true" class="loading-spinner" />
        </div>

        <div v-if="successful" class="successful-container">
          <div class="successful-header">
            Successful!
          </div>
          <div class="successful-text">
            An email has been sent to your email.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'auth',
  auth: false,
  data: () => ({
    email: '',
    loading: false,
    successful: false,
    errors: { email: null }
  }),
  methods: {
    async requestEmail() {
      this.loading = true

      try {
        await this.$axios.$post('/api/customer/request-password-reset', { email: this.email, domain: 'travel.iteora.com' })
        this.successful = true
      } catch (err) {
        Vue.set(this.errors, 'email', err.response.data.email)
        console.log(err.response.data)
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
.form-control {
  margin-top: 1rem;
}

.description-email {
  text-align: center;
}

.input-group-email {
  margin-top: -0.5rem;
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

.loading-spinner-bg, .successful-container {
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -30px;
  margin-left: -30px;
  background-color: rgba(255, 255, 255, 0.801);
}

.successful-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.successful-header {
  font-size: 24px;
  font-weight: 500;
  color: #052e46;
}

.loading-spinner {
  margin-top: 8rem;
}

.error-input {
  color: #ff530d;
}
</style>
