<template>
  <div>
    <h4>Payment Methods</h4>
    <div class="button-add">
      <lx-svg-icon class="icon-cont" icon="plus" w="20" h="20" />
      <div class="button-add-label">
        Add Payment Method
      </div>
    </div>
  </div>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon },
  layout: 'settings'
}
</script>

<style lang="scss" scoped>
.button-add {
  display: flex;
  border-radius: 2px;
  background-color: #2980b9;
  font-weight: 500;
  font-size: 13px;
  height: 40px;
  width: 229px;
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon-cont {
  margin-right: 7px;
}
</style>
