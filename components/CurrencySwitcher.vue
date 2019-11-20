<template>
  <select-options
    class="currency-switcher"
    :options="currencies"
    :placeholder="currencies[0]"
    value-instead-placeholder
  />
</template>

<script>
import SelectOptions from './selects/SelectOptions'

export default {
  components: { SelectOptions },
  data: () => ({
    currencies: ['EUR', 'USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD']
  }),
  // async mounted() {
  //   const currencies = await this.$axios.$get('/api/currencies')
  //   this.$store.commit('setCurrencies', currencies)
  //   currencies.map((item, key) => {
  //     this.$set(this.currencies, key, item.code)
  //   })
  //   console.log(this.currencies)
  //   this.$set(this.currencies, 5, 2)
  // },
  methods: {
    onSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
.currency-switcher {
  .wrapper-select {
    background: #052e46;
    color: white;
    border-radius: 4px;
  }

  .options {
    max-height: 160px;
    background:#052e46;
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
