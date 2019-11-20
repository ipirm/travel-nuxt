<template>
  <div class="bread-crumbs-container">
    <div v-for="(link, key) in breadcrumbsLinks" :key="key" class="bread-crumbs">
      {{ key !== 0 ? '&#8194;/&#8194;' : '' }}
      <i18n-link :to="'/' + link.path">
        {{ link.meta.title }}
      </i18n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    breadcrumbsLinks() {
      let arr = ['/', ...this.$route.fullPath.split('/')].filter(i => i !== '')

      // delete #anchor
      arr = arr.map(item => item.split('#')[0])

      // delete es, en, fr, etc and __
      arr = arr.filter(i => !this.$i18n.locales.some(item => item.code === i))
        .map(i => i.replace(/_/g, ' '))

      if(this.name){
        arr[arr.length-1] = this.name;
      }

      return arr.map((item) => {
        if (item === '/') {
          return { path: '/', meta: { title: 'Home' } }
        }

        return { path: item, meta: { title: item.charAt(0).toUpperCase() + item.substr(1) } }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.bread-crumbs-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.bread-crumbs {
  font-size: 13px;
  color: $light;
}
</style>
