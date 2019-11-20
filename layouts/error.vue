<template>
  <div class="main-container">
    <h1 v-if="error.statusCode === 404">
      <div class="code-number">
        404
      </div>
      <div class="description-code">
        Page not found
      </div>
    </h1>
    <h1 v-else>
      <div class="code-number">
        {{ error.statusCode }}
      </div>
      <div class="description-code">
        An error occurred
      </div>
    </h1>
    <div class="description-bottom">
      You may have typed the address incorrectly or you may have used an oudated link.
      <nuxt-link class="link" to="/">
        Come back home
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.main-container {
  height: 40rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $blue;
}

.description-code {
  font-size: 32px;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.code-number {
  font-size: 150px;
  font-weight: 300;
}

.link {
  color: $blue-light;
  font-size: 16px;
}

.description-bottom {
  max-width: 668px;
  color: $blue-dark;
  text-align: center;
}
</style>
