<template>
  <div class="scavenger-cont">
    <div class="header" @click="openSlot">
      <div class="header-left-cont">
        <svg xmlns="http://www.w3.org/2000/svg" v-if="icon === 'pin-flag'" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2" overflow="visible" preserveAspectRatio="none" viewBox="0 0 34 34" xml:space="preserve" height="24" width="24" y="0px" x="0px" id="Layer_1_1566245280990"><g transform="translate(1, 1)"><style type="text/css">
	.st0_1566245280990{display:none;}
</style><path d="M15.9,0.2c-7.4,0-13.3,6-13.3,13.3c0,7.4,6,13.3,13.3,13.3s13.3-6,13.3-13.3C29.3,6.1,23.3,0.2,15.9,0.2z   M19.7,17.1c-2,2-5.4,2-7.4,0s-2-5.4,0-7.4s5.4-2,7.4,0C21.8,11.7,21.8,15.1,19.7,17.1z" class="st0_1566245280990" vector-effect="non-scaling-stroke" style="fill: rgb(250, 171, 26);"/><path d="M25.5,3.9c-5.2-5.2-13.7-5.2-19,0c-5.2,5.2-5.2,13.7,0,19l8.8,8.8c0.4,0.4,1,0.4,1.4,0l8.8-8.8C30.7,17.7,30.7,9.2,25.5,3.9  z M22.3,13.6c0,0.1-0.1,0.1-0.2,0.1c-1.8,0.3-3.1,1.3-4.5,2.4c-0.8,0.7-1.8,1.3-2.7,1.8c-0.3,0.1-0.6,0.3-0.9,0.4l2.5,5.1  c0.1,0.1,0,0.3-0.1,0.4l-0.9,0.5c-0.1,0.1-0.3,0-0.3-0.1L8.4,10.4c-0.2-0.4,0-0.9,0.4-1c0.4-0.2,0.9,0,1,0.4l0.3,0.5  c1.3-0.4,2.4-1.2,3.5-2.1c1.4-1,2.8-2.1,4.8-2.5c0.1,0,0.2,0,0.3,0.1l3.7,7.5C22.3,13.4,22.3,13.5,22.3,13.6z" vector-effect="non-scaling-stroke" style="fill: rgb(250, 171, 26);"/></g></svg>
        <lx-svg-icon v-if="icon !== 'pin-flag'" :icon="icon" h="24px" w="24px" :style="{color: color}" />
        <div class="name">
          {{ name }}
        </div>
        <div class="description">
          {{ description }}
        </div>
      </div>

      <div class="header-right-cont">
        <lx-svg-icon v-if="active" icon="plus-secondary" h="20px" w="20px" />
        <lx-svg-icon v-else icon="minus" h="20px" w="20px" />
      </div>
    </div>

    <transition name="smooth" appear>
      <div v-if="!active" class="content">
        <slot></slot>
      </div>
    </transition>

    <div class="hr-gorizontal"></div>
  </div>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon },
  props: {
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#2980b9'
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  watch:{
    active(){
      console.log('wtf')
    }
  },
  methods: {
    openSlot() {
      this.$emit('update:active', !this.active)
    }
  },

}
</script>

<style lang="scss" scoped>
@import "~assets/scss/module-variables";

.scavenger-cont {
  width: 100%;
}

.hr-gorizontal {
  width: 100%;
  height: 1px;
  background-color: #e6edf1;
}

.header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  height: 70px;
  align-items: center;
  font-size: 16px;
  color: $dark-secondary;
}

.header-left-cont {
  display: flex;
}

.header-right-cont {
  color: #6b94ac;
}

.name {
  font-weight: 700;
  margin: 0 7px;
}

.description {
  font-weight: 500;
}

.content {
  max-height: 2000px;
  opacity: 1;
}

.smooth-enter-active, .smooth-leave-active {
  transition: all .5s;
}

.smooth-enter, .smooth-leave-to {
  max-height: 0;
  opacity: 0;
}

.smooth-enter {
  opacity: 1;
}
</style>
