<template>
  <div class="section-button-more">
    <div class="search-icon">
      <lx-svg-icon icon="search" w="20" h="20" />
    </div>
    More Activities
  </div>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { LxSvgIcon }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.section-button-more {
  margin-top: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: $blue-light;
  height: 49px;
  width: 268px;
  border-radius: 5px;
  border: 1px solid $blue-light;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: $blue-light;
    color: white;
  }
}

.search-icon {
  margin-right: 4px;
  margin-top: -2px;
}
</style>
