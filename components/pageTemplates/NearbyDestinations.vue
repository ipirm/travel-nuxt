<template>
  <section class="nearby-destinations">
    <div class="section-header-text">
      Nearby Destinations
    </div>

    <div class="nearby-destinations-cards">
      <div
        v-for="(item, key) in nearbyDstArray"
        :key="key"
        :style="`background-image: url(${item.background});`"
        class="nearby-destinations-card"
      >
        <div class="nearby-dst-text">
          {{ item.text }}
        </div>
        <div class="nearby-dst-distance">
          {{ item.distance }}
        </div>
        <div class="nearby-dst-bg"></div>
      </div>
    </div>

    <search-button />
  </section>
</template>

<script>
import country from '@/mockdata/country'
import SearchButton from '@/components/buttons/SearchButton'

export default {
  components: { SearchButton },
  data() {
    return {
      ...country
    }
  }
}
</script>

<style lang="scss" scoped>
.nearby-destinations {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nearby-destinations-cards {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  width: 1300px;
}

.nearby-destinations-card {
  background-size: cover;
  background-repeat: no-repeat;
  width: 307px;
  height: 251px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.nearby-dst-text {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  z-index: 2;
  width: 235px;
  height: 70px;
  line-height: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nearby-dst-distance {
  color: #ffffff;
  font-size: 16px;
  z-index: 2;
}

.nearby-dst-bg {
  background-color: rgba(4, 30, 46, 0.4);
  width: 307px;
  height: 251px;
  position: absolute;
}

@media (max-width: 1400px) {
  .nearby-destinations-cards {
    flex-wrap: wrap;
    width: 700px;
    margin-top: 0;
  }

  .nearby-destinations-card {
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .nearby-destinations-cards {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
}
</style>
