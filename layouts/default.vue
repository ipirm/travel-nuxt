<template>
  <div class="default-layout">
    <header-bar />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import { mapActions } from 'vuex'

export default {
  head () {
    return {
        script: [
            { src: 'https://www.paypal.com/sdk/js?client-id=AWw0rqKOA1p_IP4EFYjk_IGL9XymzjvzMS5ASPlCRSRdQtTRh8s9_CSrU6kQH6gByp4y4dOcouvNmoML&currency=USD&debug=true' }
        ]
    }
  },
  components: {
    HeaderBar,
    FooterBar
  },
  methods: {
      ...mapActions('auth', ['getProfile'])
  },
  mounted() {
      this.getProfile()
  },

}
</script>

<style lang="scss">
@import '~assets/scss/transition';
@media (min-width: 769px) {
  .default-layout{
    overflow-x: hidden;
  }
}
</style>
