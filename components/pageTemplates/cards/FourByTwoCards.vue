<template>
  <no-ssr>
    <section class="cards-section">
      <div class="section-header-text">
        Best Iceland tours
      </div>
      <hooper :items-to-show="2" :wheel-control="false" :settings="secondSliderStgs" class="cards-slider">
        <slide v-for="(item, key) in cards" :key="key" :index="key" class="card-slide">
          <card-offer
            v-for="(card, index) in item"
            :key="index"
            v-bind="card"
            :type="windowWidth <= 768 ? 'vertical' : 'horizontal'"
            hot-tour
            like
          />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
      <hooper-styles />
    </section>
  </no-ssr>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper'
import 'hooper/dist/hooper.css'

import CardOffer from '@/components/cards/CardOffer'
import HooperStyles from '@/components/HooperStyles'
import windowWidth from '@/mixins/windowWidth'

export default {
  components: {
    Hooper,
    Slide,
    CardOffer,
    HooperNavigation,
    HooperPagination,
    HooperStyles
  },
  mixins: [windowWidth],
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      secondSliderStgs: {
        breakpoints: {
          1440: {
            itemsToShow: 2
          },
          320: {
            itemsToShow: 1
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cards-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cards-slider {
  display: flex;
  justify-content: center;
  height: 50rem;
  width: 1330px;
  margin-top: 2rem;
}

.card-slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 4rem;
  padding-top: 10px;
}

@media (max-width: 1440px) {
  .cards-slider {
    width: 655px;
  }
}

@media (max-width: 768px) {
  .cards-slider {
    width: 330px;
    margin-top: 2rem;
  }

  .cards-slider {
    height: 60rem;
  }
}

@media (max-width: 436px) {
  .cards-slider {
    width: 290px
  }
}
</style>
