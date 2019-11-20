<template>
  <div class="page login-page">
    <i18n-link to="/" class="logo logo-w"></i18n-link>
    <div class="overlay">
      <div class="card card-auth">
        <div class="card-body">
          <h4 class="card-title">
            Login
          </h4>
          <login-form></login-form>
        </div>
        <div class="card-footer">
          <p class="card-text text-small">
            By loggin in, you accept our
            <i18n-link to="#">
              Terms of Use and Privacy & Cookies
            </i18n-link>
          </p>
          <p class="card-text">
            <i18n-link to="/auth/forgot_password">
              Forgot Password?
            </i18n-link>
          </p>
          <p class="card-text font-weight-medium">
            Don't have account?
            <i18n-link to="/auth/signup">
              Sign up
            </i18n-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/auth/LoginForm'

export default {
  layout: 'auth',

  auth: false,

  components: {
    LoginForm
  }
}
</script>
