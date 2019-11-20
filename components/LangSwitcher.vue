<template>
  <select-options
    class="language-switcher"
    :options="availableLocales"
    :placeholder="availableLocales[activeIndex]"
    value-instead-placeholder
    @selected-option="onSelect"
  />
</template>

<script>
import { mapActions } from 'vuex'
import SelectOptions from './selects/SelectOptions'

export default {
  components: { SelectOptions },
  computed: {
    availableLocales() {
      return this.$i18n.locales.map(i => i.name)
    },
    activeIndex() {
      return this.$i18n.locales.findIndex(i => i.code === this.$i18n.locale)
    }
  },
  methods: {
    ...mapActions('i18n', [
      'setLocale',
      'setMessages'
    ]),
    onSelect(locale) {
      const localeObject = this.$i18n.locales.find(item => item.name === locale)
      this.$i18n.locale = localeObject.code
      this.$i18n.setLocaleCookie(localeObject.code)
      this.$router.push(this.switchLocalePath(localeObject.code))
    }
  }
}
</script>

<style lang="scss">
.language-switcher {
  .wrapper-select {
    background: #052e46;
    color: white !important;
    border-radius: 4px;
  }

  .options {
    max-height: 160px;
    background: #052e46;
    color: white;
    border-radius: 4px;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background: none;
    }

    &::-webkit-scrollbar {
      width: 4px;
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: white;
    }
  }
}
</style>
