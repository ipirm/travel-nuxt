<template>
  <div class="main-container">
    <header-info
      :head="currentDestination.name"
      :button-text="'See all ' + currentDestination.name + ' tours'"
      :description="currentDestination.frontPageContent ? currentDestination.frontPageContent.i18n.description1 : ''"
      :backgroundImage="currentDestination.frontPageContent ? currentDestination.frontPageContent.top_photo_filename_desktop : '~static/images/home/bg-two-big.jpg'"
    />

    <div class="bread-crumbs">
      <bread-crumbs />
    </div>

    <div class="section-info-country">
      <div class="info-country-desc-text">
        {{ descrText }}
        <span v-if="!hideViewMore" class="info-country-view-more" @click="viewMore = !viewMore">{{ getCloseViewMore }}</span>
      </div>

      <!--<div class="info-country-cards">-->
        <!--<div v-for="(item, key) in infoCountryArray" :key="key" class="info-country-card">-->
          <!--<div class="info-contry-card-img" :style="`background-image: url(${item.img})`"></div>-->
          <!--<div class="info-contry-card-name">-->
            <!--{{ item.name }}-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <section class="featured-section">
      <div class="section-header-text">
        Best activities
      </div>
      <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs" class="featured-slider">
        <slide v-for="(item, key) in countryBestProducts" :key="key" :index="key">
          <card-offer
                  v-bind="item"
                  more-details
                  hot-tour
                  like
          />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </section>

    <!--<four-by-two-cards :cards="getBestCountryTours" />-->

    <!--<div class="section-button-more" @click="overlayBlock = true">-->
      <!--<div class="search-icon">-->
        <!--<lx-svg-icon icon="search" w="20" h="20" />-->
      <!--</div>-->
      <!--More Activities-->
    <!--</div>-->

    <section class="featured-section">
      <div class="section-header-text">
        Featured activities
      </div>
      <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs" class="featured-slider">
        <slide v-for="(item, key) in countryFeaturedProducts" :key="key" :index="key">
          <card-offer
            v-bind="item"
            more-details
            hot-tour
            like
          />
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </section>

    <!--<section class="search-tours">-->
      <!--<div class="section-header-text">-->
        <!--Things to do in Iceland (76)-->
      <!--</div>-->
      <!--<search-tours-form />-->
      <!--<no-ssr>-->
        <!--<div class="search-tours-cards">-->
          <!--<div class="search-tours-cards-column">-->
            <!--<card-offer-->
              <!--v-for="(card, index) in countryProducts"-->
              <!--:key="index"-->
              <!--v-bind="card"-->
              <!--class="search-tours-card"-->
              <!--more-details-->
              <!--hot-tour-->
            <!--/>-->
          <!--</div>-->
        <!--</div>-->
      <!--</no-ssr>-->
      <!--<pagination :quantity="10" :present-number="1" />-->
    <!--</section>-->

    <section class="usefull-tips-cont">
      <div class="usefull-tips-head">
        <div class="usefull-tips-head-text">
          Usefull Tips
        </div>
        <div :style="'background: url(' + usefulTipsBackground + ');'" class="usefull-tips-head-bg">
        </div>
      </div>
      <div v-if="currentDestination.frontPageContent" class="userfull-tips-cards">
        <div class="utips-cards-column">
          <div v-for="(card, i) in currentDestination.frontPageContent.i18n.text_blocks" v-if="!(i % 2)" :key="i" :style="{background: 'rgb(230, 237, 241)'}" class="userfull-tips-card">
            <div class="utip-card-headline">
              {{ card.title }}
            </div>
            <div v-html="card.text" class="utip-card-desc">
            </div>
          </div>
        </div>
        <div class="utips-cards-column">
          <div v-for="(card, i) in currentDestination.frontPageContent.i18n.text_blocks" v-if="i % 2" :key="i" :style="{background: 'rgb(230, 237, 241)'}" class="userfull-tips-card">
            <div class="utip-card-headline">
              {{ card.title }}
            </div>
            <div v-html="card.text" class="utip-card-desc">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--<nearby-destinations />-->

    <!--<partners-section />-->

    <hooper-styles />

    <overlay-block v-if="overlayBlock" @overlayClose="overlayBlock = false">
      <overlay-about-info v-bind="aboutInfoArray" />
    </overlay-block>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from 'hooper'
import 'hooper/dist/hooper.css'

import mockData from '../../mockdata/mockData'
import country from '../../mockdata/country'
import HeaderInfo from '@/components/pageTemplates/HeaderInfoNew'
import PartnersSection from '@/components/pageTemplates/PartnersSection'
import NearbyDestinations from '@/components/pageTemplates/NearbyDestinations'
import FourByTwoCards from '@/components/pageTemplates/cards/FourByTwoCards'
import CardOffer from '@/components/cards/CardOfferNew'
import SearchToursForm from '@/components/SearchToursForm'
import HooperStyles from '@/components/HooperStyles'
import OverlayBlock from '@/components/OverlayBlock'
import OverlayAboutInfo from '@/components/OverlayAboutInfo'
import Pagination from '@/components/Pagination'
import BreadCrumbs from '@/components/BreadCrumbs'
import LxSvgIcon from '@/components/LxSvgIcon'
import {mapState} from 'vuex';

import windowWidth from '@/mixins/windowWidth'

export default {
  head () {
      return {
          titleTemplate: `Booking-tours.com | ${this.currentDestination.name}`
      }
  },
  auth: false,
  components: {
    PartnersSection,
    Hooper,
    Slide,
    CardOffer,
    HooperNavigation,
    HooperPagination,
    SearchToursForm,
    HooperStyles,
    Pagination,
    OverlayBlock,
    OverlayAboutInfo,
    HeaderInfo,
    NearbyDestinations,
    FourByTwoCards,
    BreadCrumbs,
    LxSvgIcon
  },
  mixins: [windowWidth],
  data: () => ({
    ...mockData,
    ...country,
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
      },
    },
    viewMore: false,
    overlayBlock: false,
    usefulTipsBackground: '~static/images/home/bg-two-big.jpg',
    hideViewMore: false,
    descrText: ''
  }),
  computed: {
    ...mapState('countries', ['currentCountry']),
    ...mapState('destinations', ['currentDestination']),
    ...mapState('products', ['countryProducts','countryFeaturedProducts','countryBestProducts']),
    ...mapState('texts', ['countryTexts']),
    getDescCountry() {
      if (this.viewMore === true) {
        return this.descCountry
      }
      if (this.descCountry.length > 332) {
        return this.descCountry.slice(0, 330) + '...'
      }

      return ''
    },
    getCloseViewMore() {
      let text = this.currentDestination.frontPageContent ? this.currentDestination.frontPageContent.i18n.description2 : '';
      if (this.viewMore === false) {
        this.descrText = text.substring(0,299);
        return '+ View more'
      }
      this.descrText = text;
      return '...Close'
    },
    getBestCountryTours() {
      if (process.client) {
        if (this.windowWidth <= 768) {
          return this.icelandToursArray.map(array => array.slice(0, 2))
        }
      }

      return this.icelandToursArray
    },
    getSearchToursArray() {
      if (process.client) {
        if (this.windowWidth <= 768) {
          return this.searchToursArray.filter((array, key) => {
            return key !== 2 && key !== 3 && key !== 1
          })
        }

        if (this.windowWidth <= 1024) {
          return this.searchToursArray.filter((array, key) => {
            return key !== 2 && key !== 3
          })
        }

        if (this.windowWidth <= 1330) {
          return this.searchToursArray.filter((array, key) => {
            return key !== 3
          })
        }
      }

      return this.searchToursArray
    },
  },
  watch: {
      currentDestination: {
          handler(val){
              if(val.id){
                  if(val.frontPageContent){
                      if(val.frontPageContent.useful_tips_photo_filename_desktop){
                          this.usefulTipsBackground = val.frontPageContent.useful_tips_photo_filename_desktop;
                      }
                  }
                  let body = {
                      id: val.id,
                      type: val.desctinationType
                  }

                  this.$store.dispatch('products/getCountryProducts', body);
                  this.$store.dispatch('products/getCountryFeaturedProducts', body)
                  this.$store.dispatch('products/getCountryBestProducts', body)
                  this.getDescData();
//                  this.$store.dispatch('texts/getCountryTexts', val.id)
              }
          },
      },
  },
  methods:{
      getDescData(){
          let text = this.currentDestination.frontPageContent ? this.currentDestination.frontPageContent.i18n.description2 : '';
          if(text.length < 300){
              this.hideViewMore = true;
              this.descrText = text;
          }else{
              this.descrText = text.substring(0,299);
          }
      }
  },

  mounted(){
      this.$store.dispatch('destinations/getCurrentDestination', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bread-crumbs {
  display: flex;
  justify-content: flex-start;
  max-width: 1290px;
  width: 100%;
  margin-top: 14px;
}

.section-info-country {
  max-width: 1300px;
  margin-top: 2.8rem;
  display: flex;
  flex-wrap: wrap;
}

.info-country-desc-text {
  color: $blue-dark;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
}

.info-country-weather {
  width: 28%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-country-cards {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 950px;
}

.info-country-card {
  height: 61px;
  width: 303px;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.1);
  background-color: #ffffff;
  display: flex;
  cursor: pointer;
}

.info-country-view-more {
  font-size: 16px;
  color: $blue-light;
  font-weight: 500;
  cursor: pointer;
}

.info-contry-card-img {
  min-width: 84px;
  height: 61px;
  background-size: cover;
}

.info-contry-card-name {
  font-size: 16px;
  color: $blue-dark;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-left: 17px;
  padding-right: 17px;
  width: 100%;
}

.featured-section, .search-tours {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-tours {
  margin-bottom: 2rem;
}

.featured-slider {
  display: flex;
  justify-content: center;
  height: 31rem;
  width: 1300px;
  margin-top: 2.5rem;
}

.search-tours-cards {
  display: flex;
  flex-direction: row;
  width: 1300px;
  height: 55rem;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.search-tours-cards-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.usefull-tips-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.usefull-tips-head {
  background: url('~static/images/home/bg-two-big.jpg') no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15rem;
  position: relative;
}

.usefull-tips-head-text {
  color: #ffffff;
  font-size: 44px;
  font-weight: 500;
  z-index: 2;
}

.usefull-tips-head-bg {
  /*background-image: linear-gradient(180deg, rgba(12, 22, 31, 0.39) 1%, rgba(4, 30, 46, 0.55) 100% );*/
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
}
.usefull-tips-head-bg img{
  height: 100%;
  width: 100%;
}

.userfull-tips-card {
  max-width: 632px;
  padding: 27px 26px 30px 34px;
  margin-top: 1.7rem;
  height: auto;
}

.userfull-tips-cards {
  width: 1300px;
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}

.utips-cards-column {
  display: flex;
  flex-direction: column;
}

.utip-card-headline {
  font-size: 26px;
  color: $blue-dark;
  font-weight: 700;
  line-height: 2rem;
  margin-bottom: 10px;
}

.utip-card-desc {
  color: $blue-dark;
  font-size: 14px;
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

.search-icon {
  margin-right: 4px;
  margin-top: -2px;
}

@media (max-width: 1400px) {
  .featured-slider {
    width: 1000px
  }

  .nearby-destinations-cards {
    flex-wrap: wrap;
    width: 700px;
    margin-top: 0;
  }

  .nearby-destinations-card {
    margin-top: 2rem;
  }
}

@media (max-width: 1330px) {
  .userfull-tips-cards {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .search-tours-cards {
    width: 1000px;
    justify-content: space-around;
  }

  .section-info-country {
    max-width: none;
    width: 100%;
    flex-wrap: wrap;
  }

  .info-country-desc-text {
    margin-left: 1rem;
    width: 70%;
  }

  .info-country-cards {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 950px;
  }

  .bread-crumbs {
    padding-left: 2rem;
  }
}

@media (max-width: 1100px) {
  .featured-slider {
    width: 670px
  }
}

@media (max-width: 1024px) {
  .search-tours-cards {
    width: 670px;
  }

  .section-info-country {
    padding: 0 2.8rem 0 2.8rem;
  }

  .info-country-cards {
    flex-direction: column;
    height: 220px;
    width: 300px;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .info-country-desc-text {
    width: 100%;
    text-align: center;
  }

  .info-country-weather {
    width: 40%;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .featured-slider, .search-tours-cards {
    width: 330px;
    margin-top: 2rem;
  }

  .header-description {
    padding: 0 10px 0 10px;
  }

  .nearby-destinations-cards {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .section-info-country {
    justify-content: center;
  }
}

@media (max-width: 436px) {
  .featured-slider {
    width: 290px
  }
}
</style>
