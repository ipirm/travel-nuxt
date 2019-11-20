<template>
  <div :class="{'checkbox-container-active': state}" class="checkbox-container" @click="onActive">
    <div :class="{'circle-active': state}" class="circle"></div>
    <div :class="{'off-on-active': state}" class="off-on">
      {{ activeText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    activeText: 'Off',
    state: false
  }),
  methods: {
    onActive() {
      this.activeText = this.activeText === 'Off' ? 'On' : 'Off'
      if (this.activeText === 'On') {
        this.state = true
        this.$emit('onActive', true)
      } else {
        this.state = false
        this.$emit('onActive', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-container {
  background-color: #e6edf1;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
  opacity: 0.9;
  width: 70px;
  height: 26px;
  border-radius: 26px;
  cursor: pointer;
  padding: 3px;
  display: flex;
  position: relative;
  align-items: center;
  color: #6b94ac;
  transition: all 0.4s ease;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
  border-radius: 100%;
  position: absolute;
  transition: transform 0.4s ease;
}

.off-on {
  position: absolute;
  right: 0;
  padding-right: 12px;
  font-weight: 500;
  font-size: 12px;
  transition: transform 0.4s ease;
}

.checkbox-container-active {
  background-color: #2980b9;
  color: #ffffff;
}

.circle-active {
  transform: translateX(42px);
}

.off-on-active {
  transform: translateX(-29px);
}
</style>
