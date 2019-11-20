<template>
  <div class="auth-layout">
    <nuxt />
    <no-ssr>
      <notifications group="settings" position="top right" />
    </no-ssr>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$googleAuth().load()
    this.$facebookAuth().load()
  }
}
</script>
