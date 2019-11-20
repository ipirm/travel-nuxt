<template>
  <div class="main-container">
      <div class="utip-card-headline">
        {{ currentText.title }}
      </div>
      <div v-html="currentText.text" class="utip-card-desc">

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
    overlayBlock: false
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
  width: 70%;
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
  margin-top: 20px;
  margin-bottom: 40px;
}

.utip-card-desc {
  color: $blue-dark;
  font-size: 14px;
  margin-bottom: 40px;
    padding-left: 10%;
    padding-right: 10%;
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
