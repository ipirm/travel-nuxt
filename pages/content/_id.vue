<template>
  <div class="main-container">
      <div  style="background: url('/uploads/product_promo/2019-10-24/157190732760754600-1400.jpg');" class="banner-image">
          <div class="banner-image-title">Iceland</div>
      </div>
      <div class="main-block">
          <div class="bread-crumbs-cont">
              <bread-crumbs v-if="currentText.id" :name='currentText.title'/>
          </div>
          <div class="desc-tabs">
              <a
                      v-for="(item, key) in tabs"
                      :key="'tabs'+key"
                      v-smooth-scroll
                      :href="`#nav_${key + 1}`"
                      class="desc-tab"
              >{{ item }}</a>
          </div>
      </div>
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
          titleTemplate: `Booking-tours.com | ${this.currentText.title}`
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
      }
    },
    viewMore: false,
    overlayBlock: false,
    tabs: [
      'Highlights',
      'Itinerary',
      `What's Included`,
      'Additional Info',
      'Availability'
    ],
  }),
  computed: {
    ...mapState('texts', ['currentText']),
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
      if (this.viewMore === false) {
        return '+ View more'
      }

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

  mounted(){
      this.$store.dispatch('texts/getCurrentText', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-block{
      padding-left: 74px;
      padding-right: 74px;
      width: 100%;
  }
}

.bread-crumbs {
  display: flex;
  justify-content: flex-start;
  max-width: 1290px;
  width: 100%;
  margin-top: 14px;
  text-align: left;
}
.banner-image{
    height: 308px;
    width: 100%;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    .banner-image-title{
        text-align: center;
        margin-top: 130px;
        font-size: 44px;
        color: #ffffff;
        text-decoration: none solid rgb(255, 255, 255);
        line-height: 48px;
        font-weight: 700;
    }
    margin-bottom: 14px;
}
.bread-crumbs-cont{
    margin-bottom: 30px;
}
.desc-tabs {
    display: flex;
    background-color: #fff;
    width: 100%;
    max-width: 754px;
    position: sticky;
    top: 0;
    z-index: 2010;
    margin: 0 auto;
}

.desc-tab {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 35px;
    border-bottom: 1px solid #e6edf1;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
        border-bottom: 2px solid $blue-light;
        color: $blue-light;
    }
}

.desc-tabs {
    font-size: 13px;
    justify-content: space-around;
}

.desc-tab {
    padding-top: 0px;
}

</style>
