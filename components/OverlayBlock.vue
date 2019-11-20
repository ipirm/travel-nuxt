<template>
  <transition name="fade" appear>
    <div class="overlay-container">
      <div class="close" @click="$emit('overlayClose')">
        <lx-svg-icon icon="cross" w="35" h="35" />
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.overlay-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #859ba9;
  z-index: 10;
  margin-top: -77px;
}

.content {
  width: 1162px;
  height: 784px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.1);
  padding: 56px;
  margin-top: 5%;
}

.close {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 3rem;
  margin-top: 3rem;
  color: white;
}

@media (max-width: 1462px) {
  .content {
    width: 100vw;
    height: 100vh;
    padding: 30px;
    overflow-y: scroll;
    margin-top: 0;
    position: absolute;
  }

  .close {
    margin-right: 1rem;
    margin-top: 2rem;
  }
}

@media (max-width: 924px) {
  .close {
    z-index: 10000;
    margin-top: 3rem;
    margin-right: 3rem;
    color: black;
  }
}

@media (max-width: 770px) {
  .overlay-container {
    height: 105%;
  }
}

@media (max-width: 685px) {
  .close {
    margin-right: 2rem;
  }
}

@media (max-width: 373px) {
  .content {
    margin-top: -19rem;
  }
}

@media (max-width: 400px) {
  .content {
    margin-top: 1rem;
  }
}
</style>
