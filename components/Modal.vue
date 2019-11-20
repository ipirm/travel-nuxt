<template>
  <transition appear name="modal">
    <div class="modal-mask" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-inner">
          <a href="#" class="close" @click="$emit('close')">
            <lx-svg-icon icon="cross" w="16" h="16" />
          </a>
          <slot />
        </div>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  transition: opacity .3s ease;
  overflow: auto;
}

.modal-container {
  position: relative;
  margin: auto;
  transition: all .3s ease;
}

.modal-inner {
  position: relative;
  background-color: #fff;
  box-shadow: 1px 0 10px 0 rgba(4,4,4,.22);
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 100;
  color: #777;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container {
  transform: scale(.5);
}

.modal-leave-active .modal-container{
  transform: scale(1.25);
}




@media screen and (max-width: 768px) {
  .modal-container {
    width: 100%;
  }
  .close {
    right: 0.5rem !important;
    top: 0.5rem !important;
  }
}
</style>
