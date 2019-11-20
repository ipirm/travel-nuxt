<template>
  <div class="slider-select">
    <div class="inputs">
      <input id="fromDays" class="input" v-model="value[0]" type="text" name="">
      <div class="days">
        Days
      </div>
      <input id="toDays" class="input" v-model="value[1]" type="text" name="" >
    </div>
    <div class="slider">
      <no-ssr>
        <vue-slider-component v-model="value" :max=25 v-on:drag-end="sliderChanged()"/>
      </no-ssr>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        start: 0,
        end: 0,
        value: [0, 0]
      }
    },
    methods: {
      sliderChanged() {
        this.$store.dispatch('products/setActiveFilterOptions', { durationDaysFrom: this.value[0], durationDaysTo: this.value[1] })
      }
    },
    mounted() {
      let from = this.$store.state.products.activeFilters.durationDaysFrom ? this.$store.state.products.activeFilters.durationDaysFrom : 0;
      let to = this.$store.state.products.activeFilters.durationDaysTo ? this.$store.state.products.activeFilters.durationDaysTo : 0;
      this.value = [from, to];
    }
  }
</script>

<style lang="scss" scoped>
  .slider-select {
    width: 293px;
    border-radius: 4px;
    background-color: #fff;
    padding: 14px;
    font-size: 13px;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .label-text {
    margin-bottom: 2px;
  }

  .hr-gorizontal {
    width: 100%;
    height: 1px;
    background-color: #e6edf1;
    margin: 18px 0;
  }

  .inputs {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  .input-text {
    display: flex;
    align-items: center;
  }

  .input {
    width: 75px;
    height: 36px;
  }

  .input-label {
    margin-right: 9px;
  }

  .slider {
    margin-top: 16px;
  }
</style>
