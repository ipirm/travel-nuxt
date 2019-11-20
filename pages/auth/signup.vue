<template>
  <div class="page signup-page">
    <i18n-link to="/" class="logo logo-w"></i18n-link>
    <div class="overlay">
      <div class="card card-auth">
        <div class="card-body">
          <h4 class="card-title">
            Sign up
          </h4>
          <signup-form></signup-form>
        </div>
        <div class="card-footer">
          <p class="card-text text-small">
            By loggin in, you accept our
            <i18n-link to="#">
              Terms of Use and Privacy & Cookies
            </i18n-link>
          </p>
          <p class="card-text font-weight-medium">
            Have account?
            <i18n-link to="/auth/login">
              Sign in
            </i18n-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '~/components/auth/SignupForm'

export default {
  layout: 'auth',

  auth: false,

  components: {
    SignupForm
  }
}
</script>
