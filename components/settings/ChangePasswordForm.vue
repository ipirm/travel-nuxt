<template>
  <form class="change-password-form" @submit.prevent="save">
    <div class="form-group">
      <label for="old_password">Old Password</label>
      <div class="input-group input-group-password">
        <input
          id="old_password"
          v-model.trim="form.oldPassword"
          :type="showOldPassword ? 'text' : 'password'"
          class="form-control"
          :class="{'is-invalid': errors.oldPassword}"
          @input="errorReset('oldPassword')"
        />
        <div class="input-group-append">
          <div
            class="btn"
            :class="{ active: showOldPassword }"
            @click="showOldPassword = !showOldPassword"
          >
            <lx-svg-icon icon="eye" w="20" h="20"></lx-svg-icon>
          </div>
        </div>
        <div class="invalid-feedback">
          <div v-for="error in errors.oldPassword" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="new_password">New Password</label>
      <div class="input-group input-group-password">
        <input
          id="new_password"
          v-model.trim="form.newPassword"
          :type="showNewPassword ? 'text' : 'password'"
          class="form-control"
          :class="{'is-invalid': errors.newPassword}"
          @input="errorReset('newPassword')"
        />
        <div class="input-group-append">
          <div
            class="btn"
            :class="{ active: showNewPassword }"
            @click="showNewPassword = !showNewPassword"
          >
            <lx-svg-icon icon="eye" w="20" h="20"></lx-svg-icon>
          </div>
        </div>
        <div class="invalid-feedback">
          <div v-for="error in errors.newPassword" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="confirm_password">Confirm Password</label>
      <div class="input-group input-group-password">
        <input
          id="confirm_password"
          v-model.trim="form.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="form-control"
          :class="{'is-invalid': errors.confirmPassword}"
          @input="errorReset('confirmPassword')"
        />
        <div class="input-group-append">
          <div
            class="btn"
            :class="{ active: showConfirmPassword }"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <lx-svg-icon icon="eye" w="20" h="20"></lx-svg-icon>
          </div>
        </div>
        <div class="invalid-feedback">
          <div v-for="error in errors.confirmPassword" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">
      Save
    </button>
  </form>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon },

  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    }
  },

  methods: {
    ...mapActions('auth', ['changePassword']),

    save() {
      this.changePassword(this.form)
        .then(() => this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Password was successfully changed!'
        }))
        .catch((e) => { this.errors = e.response.data })
    },

    errorReset(field) {
      Vue.set(this.errors, field, null)
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-form {
  min-width: 300px;
}
</style>
