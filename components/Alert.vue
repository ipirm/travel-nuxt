<template>
  <div class="alert-container info">
    <lx-svg-icon class="icon" icon="info" w="37" h="37" />
    {{ text }}
  </div>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon },
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-container {
  width: 100%;
  min-height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  font-size: 13px;
  font-weight: 500;
}

.info {
  border: 1px solid #c5e5fc;
  color: #2980b9;
  background-color: #f2f7fa;
}

.icon {
  margin-right: 0.5rem;
  min-width: 37px;
}
</style>
