<template>
  <div :class="getClassBgColor" class="default-styles">
    <div v-if="discount" class="discount">
      <span>$ {{ discount }}</span>
    </div>
    <div class="currency-box">
      <div class="currency-sign">
        $
      </div>
      <span class="currency">&nbsp;{{ currency }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: { type: String, default: 'red' },
    discount: { type: [Number, String], default: 0 },
    currency: { type: [Number, String], required: true }
  },
  computed: {
    getClassBgColor() {
      if (!this.discount ) return 'orange'
      if (this.discount) return 'red'
      if (this.bgColor === 'blue-light') return 'blue-light'
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.default-styles {
  width: 95px;
  height: 95px;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: $font-family-sans-serif;
  z-index: 3;
  position: relative;
}

.discount {
  display: flex;
  flex-direction: row;
  text-decoration: line-through;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.currency-box {
  display: flex;
  font-size: 14px;
  font-weight: 700;
}

.currency {
  font-size: 24px;
  font-weight: 500;
  margin-right: 5px;
}

.currency-sign {
  font-size: 14px;
  font-weight: 700;
  margin-top: 5px;
  margin-right: -2px;
}

.red {
  background-color: $red;
}

.orange {
  background-color: $orange;
}

.blue-light {
  background-color: $blue-light;
}
</style>
