<template>
  <div>
    <h4>Change Password</h4>
    <change-password-form />
  </div>
</template>

<script>
import ChangePasswordForm from '~/components/settings/ChangePasswordForm'

export default {
  layout: 'settings',
  components: { ChangePasswordForm }
}
</script>
