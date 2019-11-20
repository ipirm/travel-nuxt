<template>
  <svg class="svg-icon" :width="w" :height="h">
    <use :href="iconPath" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    w: { type: [String, Number], required: true },
    h: { type: [String, Number], required: true }
  },
  computed: {
    iconPath() {
      return `/lx-sprites.svg#${this.icon}`
    }
  }
}
</script>

<style>
.svg-icon {
  fill: currentColor;
}
</style>
