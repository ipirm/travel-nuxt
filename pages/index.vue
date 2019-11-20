<template>
  <section class="main-container">
    <header class="header">
      <hooper
        id="first-slider"
        :items-to-show="1"
        :wheel-control="false"
        :mouse-drag="false"
        :play-speed="5000"
        auto-play
        class="header-slider"
      >
        <slide v-for="(item, key) in sliderProducts" :key="key" :index="key" class="header-slide">
          <div class="header-major-text">
            {{ item.promo.title }}
          </div>
          <div class="sentence">
            <price-tag :currency="item.minPrice" />
            <div class="sentence-description">
              {{ item.description_why_unique }}
            </div>
          </div>
          <router-link :to="'/tours/' + item.id" class="book-now">
            Book now
          </router-link>
          <div :style="'background: url( ' + getSliderUrl(item) + ' )'" class="bg-header">
            <!--<img :src="item.promo ? item.promo.thumbnails['1400'] : '~static/images/home/header.jpg'">-->
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
      <autocomplete-main :searchLiveList="searchHeaderItems" :selectedItem="chosenHeaderItem" @typed="search"
                         @blur="blur" @selected="selectItem"></autocomplete-main>
    </header>

    <section class="argument-section">
      <div v-for="(item, key) in argumentsData" class="argument">
        <div class="argument-icon">
          <img src="~assets/icons/globus.svg">
        </div>
        <div class="argument-header">
          {{ item.header }}
        </div>
        <div class="argument-description">
          {{ item.description }}
        </div>
      </div>
    </section>

    <section class="take-another-section">
      <div class="section-header-text">
        Take another look
      </div>
      <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs" class="take-another-slider">
        <slide v-for="(item, key) in mixedProducts" :key="key" :index="key">
          <card-offer
            v-bind="item"
            more-details
            :like="true"
          />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </section>

    <section class="center-content">
      <div class="section-header-text">
        Trending destinations
      </div>

      <div class="section-under-header-text">
        Discover tours, attractions and activities for your next experience
      </div>

      <hooper :items-to-show="1" :wheel-control="false" :settings="secondSliderStgs" class="trends-slider">
        <slide v-for="(card, index) in cities" :key="index" :index="index" class="trends-slide">
          <div>
            <div v-for="(city, index1) in card"  :key="index1">
              <i18n-link class="nav-link" :to="'/destinations/' + city.slug">
                <card-trending :data="city" />
              </i18n-link>
            </div>
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>

      <!--<div class="section-button-more" @click="overlayBlock = true">-->
        <!--<div class="search-icon">-->
          <!--<lx-svg-icon icon="search" w="20" h="20" />-->
        <!--</div>-->
        <!--More Destinations-->
      <!--</div>-->
    </section>

    <section class="featured-tours-section center-content">
      <div class="section-header-text">
        Featured tours
      </div>

      <div class="section-under-header-text">
        Handpicked tours by our travel experts
      </div>

      <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs" class="take-another-slider">
        <slide v-for="(item, key) in featuredProducts" :key="key" :index="key">
          <card-offer
                  v-bind="item"
                  more-details
                  like
          />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>

      <!--<div class="section-button-more" @click="overlayBlock = true">-->
        <!--<div class="search-icon">-->
          <!--<lx-svg-icon icon="search" w="20" h="20" />-->
        <!--</div>-->
        <!--More Tours-->
      <!--</div>-->
    </section>

    <!--<section class="center-content">-->
      <!--<div class="section-header-text">-->
        <!--Activities we love-->
      <!--</div>-->

      <!--<div class="section-under-header-text">-->
        <!--Favorite experiences booked by travelers-->
      <!--</div>-->

      <!--<hooper :items-to-show="4" :wheel-control="false" :settings="thirdSliderStgs" class="activities-slider">-->
        <!--<slide v-for="(item, key) in activitiesArray" :key="key" :index="key">-->
          <!--<div class="activities-slide">-->
            <!--<card-offer-->
              <!--v-for="(card, idx) in item"-->
              <!--:key="idx"-->
              <!--v-bind="card"-->
              <!--type="mini"-->
              <!--more-details-->
              <!--hot-tour-->
            <!--/>-->
          <!--</div>-->
        <!--</slide>-->
        <!--<hooper-navigation slot="hooper-addons"></hooper-navigation>-->
      <!--</hooper>-->

      <!--<div class="section-button-more" @click="overlayBlock = true">-->
        <!--<div class="search-icon">-->
          <!--<lx-svg-icon icon="search" w="20" h="20" />-->
        <!--</div>-->
        <!--More Activities-->
      <!--</div>-->
    <!--</section>-->

    <!--<no-ssr>-->
      <!--<section class="center-content">-->
        <!--<div class="section-header-text">-->
          <!--Travel World Wonders-->
        <!--</div>-->
        <!--<div class="section-under-header-text">-->
          <!--Curated suggestions based on World Wonders-->
        <!--</div>-->
        <!--<hooper :items-to-show="1" :wheel-control="false" :mouse-drag="false" class="travel-slider">-->
          <!--<slide v-for="(array, key) in getTravelArray" :key="key" :index="key" class="travel-slide">-->
            <!--<div v-for="(item, index) in array" :key="index" class="travel-slide-item">-->
              <!--<div v-if="item.type === 'big-photo'" class="travel-big-photo travel-photo-styles">-->
                <!--<div class="travel-photo-header">-->
                  <!--{{ item.header }}-->
                <!--</div>-->

                <!--<div class="travel-photo-desc">-->
                  <!--{{ item.text }}-->
                <!--</div>-->

                <!--<div class="travel-photo-icon">-->
                  <!--<img src="~assets/icons/points.svg" alt="points">-->
                <!--</div>-->

                <!--<div class="travel-bg-photo-one"></div>-->
              <!--</div>-->
              <!--<div v-if="item.type === 'photo'" class="travel-photo travel-photo-styles">-->
                <!--<div class="travel-photo-header">-->
                  <!--{{ item.header }}-->
                <!--</div>-->

                <!--<div class="travel-photo-desc">-->
                  <!--{{ item.text }}-->
                <!--</div>-->

                <!--<div class="travel-photo-icon">-->
                  <!--<img src="~assets/icons/points.svg" alt="points">-->
                <!--</div>-->
                <!--<div class="travel-bg-photo-two"></div>-->
              <!--</div>-->
              <!--<card-offer-->
                <!--v-if="item.type === 'card'"-->
                <!--:discount="item.discount"-->
                <!--:currency="item.currency"-->
                <!--:date="item.date"-->
                <!--:availability="item.availability"-->
                <!--:header-text="item.headerText"-->
                <!--:address="item.address"-->
                <!--:star-evaluation="item.starEvaluation"-->
                <!--:reviews="item.reviews"-->
                <!--:bg-image="item.bgImage"-->
                <!--class="travel-card-offer"-->
                <!--more-details-->
                <!--hot-tour-->
              <!--/>-->
            <!--</div>-->
          <!--</slide>-->
          <!--<hooper-navigation slot="hooper-addons"></hooper-navigation>-->
        <!--</hooper>-->

        <!--<div class="section-button-more" @click="overlayBlock = true">-->
          <!--<div class="search-icon">-->
            <!--<lx-svg-icon icon="search" w="20" h="20" />-->
          <!--</div>-->
          <!--More Wonders-->
        <!--</div>-->
      <!--</section>-->
    <!--</no-ssr>-->

    <!--<partners-section />-->

    <overlay-block v-if="overlayBlock" @overlayClose="overlayBlock = false">
      <overlay-about-info v-bind="aboutInfoArray" />
    </overlay-block>
    <hooper-styles />
  </section>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper'
import { mapState, mapActions } from 'vuex'
import 'hooper/dist/hooper.css'
import mockData from '@/mockdata/mockData'

import PartnersSection from '@/components/pageTemplates/PartnersSection'
import PriceTag from '@/components/PriceTag'
import CardOffer from '@/components/cards/CardOfferNew'
import CardTrending from '@/components/cards/CardTrendingNew'
import OverlayBlock from '@/components/OverlayBlock'
import OverlayAboutInfo from '@/components/OverlayAboutInfo'
import HooperStyles from '@/components/HooperStyles'
import LxSvgIcon from '@/components/LxSvgIcon'

import windowWidth from '@/mixins/windowWidth'
import AutocompleteMain from "../components/selects/AutocompleteMain";



export default {
  head: {
      titleTemplate: 'Booking-tours.com | Book tours, activites and attractions all over the world',
      meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },

          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'Booking-tours.com | Book tours, activites and attractions all over the world' }
      ]
  },
  auth: false,
  mounted(){
    this.$store.dispatch('ui/setShowHeaderSearch', false);
  },
  components: {
    AutocompleteMain,
    PriceTag,
    CardOffer,
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
    PartnersSection,
    CardTrending,
    OverlayBlock,
    OverlayAboutInfo,
    HooperStyles,
    LxSvgIcon
  },
  mixins: [windowWidth],
  data: () => ({
    hoverTrends: false,
    overlayBlock: false,
    search_live: false,
    ...mockData,
    firstSliderStgs: {
      breakpoints: {
        1400: {
          itemsToShow: 4
        },
        1100: {
          itemsToShow: 3
        },
        768: {
          itemsToShow: 2
        },
        320: {
          itemsToShow: 1
        }
      }
    },
    secondSliderStgs: {
      breakpoints: {
        1400: {
          itemsToShow: 3
        },
        1000: {
          itemsToShow: 2
        },
        320: {
          itemsToShow: 1
        }
      }
    },
    thirdSliderStgs: {
      breakpoints: {
        1400: {
          itemsToShow: 4
        },
        1100: {
          itemsToShow: 3
        },
        768: {
          itemsToShow: 2
        },
        320: {
          itemsToShow: 1
        }
      }
    },
    argumentsData: [
        {
            header: 'Best Price Guaranteed',
            description: 'Discounts up to 60% off'
        },
        {
            header: '24/7',
            description: 'Global Support'
        },
        {
            header: 'Handpicked Experiences',
            description: 'Read real user reviews'
        },
        {
            header: '200,000+',
            description: 'Things to Do'
        }
    ]
  }),
  computed: {
    ...mapState('ui', ['searchHeaderItems', 'chosenHeaderItem']),
    ...mapState('products', ['sliderProducts','featuredProducts','mixedProducts']),
    ...mapState('countries', ['countries']),
    ...mapState('cities', ['cities']),
    getTravelArray() {
      if (process.client) {
        if (this.windowWidth <= 768) {
          return this.travelArray.map((array, key) => {
            return array.filter((item, key) => {
              return key !== 1 && key !== 2
            })
          })
        }

        if (this.windowWidth <= 1100) {
          return this.travelArray.map((array, key) => {
            return array.filter((item, key) => {
              return key !== 1
            })
          })
        }
      }

      return this.travelArray
    }
  },
  created(){
    this.getSliderProducts();
    this.getFeaturedProducts();
    this.getMixedProducts();
    this.getCountries();
    this.getCities();
  },
  methods: {
    ...mapActions('products', ['getSliderProducts','getFeaturedProducts','getMixedProducts']),
    ...mapActions('countries', ['getCountries']),
    ...mapActions('cities', ['getCities']),
    search(event) {
      this.$store.dispatch('ui/getSearchItems', event.target.value);
    },
    selectItem(item) {
      let defaultFilters = {
        cityId: null,
        country_id: null,
        query: null,
        id: null
      }

      if (item['query']) {
        defaultFilters.query = item.name;
      } else if (item['product_type_id']) {
        defaultFilters.id = item.id;
      } else if (item['international_calling_code']) {
        defaultFilters.country_id = item.id;
      } else {
        defaultFilters.cityId = item.id;
      }

      this.$store.dispatch('products/setActiveFilterOptions', defaultFilters);
      this.$store.dispatch('ui/setSearchItem', item);
      this.$router.push('/tours')
    },
    blur() {
      this.$store.dispatch('ui/blurSearchItems');
    },
    getSliderUrl(item){
       return item.promo ? item.promo.thumbnails['1400'] : '~static/images/home/header.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

section {
  font-family: $font-family-sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-under-header-text {
  text-align: center;
  font-size: 20px;
  color: $blue-dark;
  margin-top: 0.7rem;
  margin-bottom: 3.5rem;
}

.section-header-text {
  font-size: 44px;
  font-weight: 500;
  color: $blue-dark;
  text-align: center;
}

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

.center-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.header-slider {
  height: 40rem;
}

.header-slide {
  /*background: url('~static/images/home/header.jpg') no-repeat;*/
  background-position: center center;
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.background-slide{
  background-position: center center;
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-major-text {
  z-index: 2;
  font-size: 44px;
  font-weight: 700;
  color: #ffffff;
  width: 40rem;
  margin-top: 6rem;
  text-align: center;
  line-height: 3.2rem;
}

.sentence {
  display: flex;
  margin-top: 2rem;
  z-index: 2;
}

.sentence-description {
  border-radius: 20px;
  height: 95px;
  width: 314px;
  background-color: $blue;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  padding: 20px 24px 24px 24px;
}

.book-now {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 50px;
  border-radius: 5px;
  background-color: #ffffff;
  font-size: 16px;
  color: $blue;
  font-weight: 500;
  margin-top: 2rem;
  z-index: 2;
  cursor: pointer;
}




.bg-header {
  height: 100%;
  width: 100%;
  background-color: rgba(4, 30, 46, 0.35);
  position: absolute;
  background-size: 100% !important;
}

.take-another-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.take-another-slider {
  display: flex;
  justify-content: center;
  height: 27.7rem;
  width: 1300px;
  margin-top: 2.5rem;
}

.argument-section {
  display: flex;
  justify-content: space-around;
  margin: 4rem 0 4rem 0;
  max-width: 1000px;
}

.argument {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 15rem;
  margin: 0 20px 0 20px;
}

.argument-icon {
  display: flex;
  justify-content: center;
}

.argument-header {
  font-size: 20px;
  color: $blue-light;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

.argument-description {
  font-size: 16px;
  color: $blue-dark;
  text-align: center;
}

.trends-slider {
  height: 26rem;
  max-width: 1400px;
  width: 1300px;
}

.featured-tours-section {
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
}

.featured-slider {
  height: 56rem;
  width: 1350px;
}

.featured-tours-slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1rem;
}

.activities-slider {
  height: 40.5rem;
  width: 1310px;
}

.activities-slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1rem;
}

.travel-slider {
  height: 57rem;
  width: 1336px;
  cursor: pointer;
}

.travel-slide {
  display: flex;
  flex-wrap: wrap;
}

.travel-slide-item {
  margin: 0 10px 0 10px;
}

.travel-photo-header {
  font-weight: 700;
  font-size: 36px;
  z-index: 2;
  margin-left: 33px;
}

.travel-photo-desc {
  font-weight: 700;
  font-size: 20px;
  z-index: 2;
  margin-left: 33px;
}

.travel-big-photo {
  width: 961px;
  height: 427px;
  background: url('~static/images/home/bg-two-big.jpg') no-repeat;
  background-position: center center;
  background-size: cover;
  &:hover > .travel-bg-photo-one {
    height: 100%;
  }
}

.travel-photo-styles {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.travel-bg-photo-one, .travel-bg-photo-two {
  background-image: linear-gradient(180deg, rgba(12, 22, 31, 0) 1%, rgba(4, 30, 46, 0.55) 100% );
  width: 100%;
  position: absolute;
  height: 161px;
  transition: all 0.2s ease-out;
}

.travel-photo {
  height: 429px;
  width: 634px;
  background: url('~static/images/home/bg-three-big.jpg') no-repeat;
  background-position: center center;
  background-size: cover;
  &:hover > .travel-bg-photo-two {
    height: 100%;
  }
}

.travel-photo-icon {
  margin-bottom: 30px;
  z-index: 2;
  margin-left: 33px;
}

::placeholder {
  font-size: 16px;
  font-weight: 500;
  color: $light;
}
:-ms-input-placeholder {
  font-size: 16px;
  font-weight: 500;
  color: $light;
}
::-ms-input-placeholder {
  font-size: 16px;
  font-weight: 500;
  color: $light;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .35s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.hooper-indicator {
  background-color: $light !important;
  border-radius: 100%;
}

.hooper-indicator.is-active {
  background-color: $blue;
}

.hooper-next {
  margin-right: -5rem !important;
}

@media (max-width: 1450px) {
  .travel-slider {
    width: 1000px;
  }

  .travel-photo {
    display: none;
  }
}

@media (max-width: 1400px) {
  .take-another-slider {
    width: 1000px
  }

  .trends-slider {
    width: 890px
  }

  .trends-slide {
    max-width: 450px;
  }

  .featured-slider, .activities-slider {
    width: 1000px
  }

  .featured-slide, .activities-slide {
    max-width: 350px;
  }
}

@media (max-width: 1100px) {
  .take-another-slider, .featured-slider, .activities-slider, .travel-slider {
    width: 670px
  }

  .take-another-slide, .featured-slide, .activities-slide {
    max-width: 340px;
  }

  .travel-big-photo {
    width: 635px;
  }
}

@media (max-width: 1000px) {
  .trends-slider {
    width: 440px;
  }

  .argument-section {
    max-width: 600px;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .argument {
    margin-top: 3rem;
  }


}

@media (max-width: 768px) {
  .section-under-header-text {
    margin-left: 10px;
    margin-right: 10px;
  }
  .bg-header{
    background-size: inherit !important;
  }
  .take-another-slider, .featured-slider, .activities-slider, .travel-slider {
    width: 330px
  }

  .trends-slider {
    width: 355px
  }

  .travel-big-photo {
    width: 310px;
  }

  .travel-photo-header {
    font-size: 24px;
    margin-left: 18px;
  }

  .travel-photo-desc {
    font-size: 18px;
    margin-left: 18px;
  }

  .travel-photo-icon {
    margin-left: 18px;
    margin-bottom: 18px;
  }

  .travel-slide-item {
    margin: 0;
  }

  ::placeholder {
    font-size: 14px;
  }
  :-ms-input-placeholder {
    font-size: 14px;
  }
  ::-ms-input-placeholder {
    font-size: 14px;
  }
}

@media (max-width: 700px) {
  .header-major-text {
    font-size: 30px;
    width: 30rem;
  }

}

@media (max-width: 532px) {
  .trends-slider {
    width: 340px;
  }

  .header-major-text {
    width: 23rem;
    font-size: 26px;
  }

}

@media (max-width: 436px) {
  .take-another-slider, .featured-slider, .activities-slider, .trends-slider, .travel-slider {
    width: 287px
  }

  .trends-slider {
    height: 27rem;
  }

  .travel-photo-header {
    font-size: 18px;
  }

  .travel-photo-desc {
    font-size: 14px;
  }

  .travel-big-photo {
    width: 280px;
  }

  .sentence-description {
    width: 250px;
    font-size: 14px;
    padding: 18px;
    padding-top: 24px;
  }

  .section-header-text {
    font-size: 40px;
    line-height: 3rem;
  }

  .section-under-header-text {
    margin-top: 0.4rem;
    margin-bottom: 3rem;
  }
}
</style>
