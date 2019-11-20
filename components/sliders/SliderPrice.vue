<template>
    <div class="slider-select">
        <div class="inputs">
            <div class="input-text">
                <div class="input-label">
                    $
                </div>
                <input v-on:change="sliderChanged()" id="from" class="input" v-model="value[0]" type="text" name="" >
            </div>
            <div class="input-text">
                <div class="input-label">
                    $
                </div>
                <input v-on:change="sliderChanged()" id="to" class="input" v-model="value[1]" type="text" name="">
            </div>
        </div>
        <div class="slider">
            <no-ssr>
                <vue-slider-component v-model="value" :max=500  v-on:drag-end="sliderChanged()"/>
            </no-ssr>
        </div>

    </div>
</template>

<script>
  import debounce from 'vue-debounce/dist/debounce.min.js'


  export default {
    data() {
      return {
        start: 0,
        end: 0,
        value: [0, 0],
        checkbox: false
      }
    },
    methods: {
      change(){

        debounce(() => console.log('normal format'), '400ms')
      },
      sliderChanged() {
        this.$store.dispatch('products/setActiveFilterOptions', { priceFrom: this.value[0], priceTo: this.value[1] })
      },
      sliderChanged2() {
       console.log('test')
      }
    },
    mounted() {
      let from = this.$store.state.products.activeFilters.priceFrom ? this.$store.state.products.activeFilters.priceFrom : 0;
      let to = this.$store.state.products.activeFilters.priceTo ? this.$store.state.products.activeFilters.priceTo : 0;
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
