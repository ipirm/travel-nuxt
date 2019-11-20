<template>

    <div class="main-container">

        <div class="bread-crumbs">
            <bread-crumbs/>
        </div>
        <div class="search-tours">
            <div class="search-left-cont">
                <harmonic-select class="harmonic-select"/>
            </div>
            <div class="tours-content">
                <div class="tours-header">
                    <div class="tours-header-text">
                        {{ chosenHeaderItem ? chosenHeaderItem.name : '' }}
                        <!--<autocomplete :searchLiveList="searchHeaderItems" :selectedItem="chosenHeaderItem" @typed="search"-->
                                      <!--@blur="blur" @selected="selectItem" @delete="deleteChosenItem"></autocomplete>-->
                    </div>
                    <div class="tours-quantity">
                        {{searchInfo.totalCount}} Tours and Tickets
                    </div>
                </div>
                <div class="tours-form-selectors">
                    <slot-select placeholder="Date" :value="dateTitle" @delete="deleteDate">
                        <date-range-picker
                                :from="activeFilters.fromStartDate"
                                :to="activeFilters.toStartDate"
                                :showControls="false"
                                :panels="['range']"
                                :presets="['custom']"
                                @select="dateSelect"/>
                    </slot-select>
                    <slot-select placeholder="Duration" :value="durationTitle" @delete="deleteOptions">

                        <label class="select-label">Duration</label>

                        <select-options :options="dayOptions"
                                        @selected-option="setSelectOptionsObjects($event,dayOptions)"/>
                        <label class="select-label">Time of the day</label>

                        <select-options :options="timeOptions"
                                        @selected-option="setSelectOptionsObjects($event,timeOptions)"/>
                    </slot-select>
                    <slot-select placeholder="Price" :value="priceTitle" @delete="deletePrice">
                        <slider-price/>
                    </slot-select>
                    <slot-select placeholder="Availability">
                        <select-options :options="arrayDuration" @selected-option="setSelectOptions($event,arrayMore)"/>
                    </slot-select>
                    <slot-select placeholder="More" :value="moreTitle" @delete="setSelectOptions($event,arrayMore)">
                        <select-options :options="arrayMore" multi-select
                                        @selected-option="setSelectOptions($event,arrayMore)"/>
                    </slot-select>


                </div>

                <div class="cont-sort-box">
                    <div class="tours-sort-by">
                        <span class="sort-by-text">
                          Sort by:
                        </span>
                        <div class="select-sort">
                            <span class="sort-by-select-text">Recommended</span>
                            <lx-svg-icon class="arrow-bottom" w="16" h="16" icon="arrow-bottom"/>
                        </div>
                    </div>

                    <div class="cont-column-box">
                        <div class="one-by-one" :class="activeColumn === 1 ? 'active-column' : ''"
                             @click="onActiveColumn(1)">
                            <lx-svg-icon w="20" h="20" icon="list1"/>
                        </div>

                        <div class="two-by-two" :class="activeColumn === 2 ? 'active-column' : ''"
                             @click="onActiveColumn(2)">
                            <lx-svg-icon w="20" h="20" icon="list2"/>
                        </div>
                    </div>

                    <div class="tours-quantity tours-quantity-secondary">1002 tours</div>

                    <div class="filter-sort-by">
                        <div class="sort-by-mobile" @click="sortingMobile = !sortingMobile">
                            <lx-svg-icon w="24" h="24" icon="sorting" class="sorting-filter-icon"/>
                            <div class="sort-by-mobile-text">Sorting: featured</div>
                        </div>

                        <div class="filter-sort">
                            <lx-svg-icon w="24" h="24" icon="filter" class="sorting-filter-icon"/>
                            <div class="sort-by-mobile-text">Filter</div>
                        </div>
                    </div>
                </div>

                <div class="tours-container" :class="{'is-tiled-view' : activeColumn === 2}">
                    <div class="tours-container-inner">
                        <big-tour-card v-for="(tour, key) in products" :key="key" class="tour-card" :tour="tour"/>
                    </div>

                    <pagination class="pagination" :quantity="searchInfo.pageCount" :presentNumber="activeFilters.page"
                                @click-item="turnPage"/>
                </div>
            </div>
        </div>

        <!--<four-by-two-cards :cards="getBestCountryTours" />-->

        <!--<nearby-destinations />-->

        <!--<partners-section />-->

    </div>
</template>

<script>
  import HeaderInfo from '@/components/pageTemplates/HeaderInfo'
  import PartnersSection from '@/components/pageTemplates/PartnersSection'
  import NearbyDestinations from '@/components/pageTemplates/NearbyDestinations'
  import FourByTwoCards from '@/components/pageTemplates/cards/FourByTwoCards'
  import country from '@/mockdata/country'
  import HarmonicSelect from '@/components/selects/HarmonicSelect'
  import SelectOptions from '@/components/selects/SelectOptions'
  import BigTourCard from '@/components/cards/BigTourCard'
  import Pagination from '@/components/Pagination'
  import BreadCrumbs from '@/components/BreadCrumbs'
  import LxSvgIcon from '@/components/LxSvgIcon'
  import SlotSelect from '@/components/selects/SlotSelect'
  import DaysSelect from '@/components/selects/DaysSelect'
  import SliderDays from '@/components/sliders/SliderDays'
  import SliderPrice from '@/components/sliders/SliderPrice'
  import Autocomplete from "@/components/selects/Autocomplete";

  import windowWidth from '@/mixins/windowWidth'
  import {mapState} from 'vuex'
  import moment from 'moment'

  export default {
  head: {
      titleTemplate: 'Booking-tours.com | Search results',
      meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },

          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'Booking-tours.com | Search results' }
      ]
  },
    auth: false,
    components: {
      HeaderInfo,
      PartnersSection,
      NearbyDestinations,
      FourByTwoCards,
      HarmonicSelect,
      SelectOptions,
      BigTourCard,
      Pagination,
      BreadCrumbs,
      LxSvgIcon,
      SliderDays,
      SliderPrice,
      SlotSelect,
      DaysSelect,
      Autocomplete
    },
    mixins: [windowWidth],
    data() {
      return {
        ...country,
        valueDataPicker: '',
        lang: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: 'Date',
            dateRange: 'Select Date Range'
          }
        },
        arrayDuration: [
          { name: '1-4 days', value: '', field: '' },
          { name: '4-7 days', value: '', field: '' },
          { name: '7-14 days', value: '', field: '' },
          { name: '14-31 days', value: '', field: '' }
        ],


        activeColumn: 1,
        sortingMobile: false
      }
    },
    methods: {
      //{to: "2019-10-26T23:59:59.999+03:00", from: "2019-10-10T00:00:00.000+03:00", panel: "range"}
      dateSelect(event) {
        if (Object.keys(event)) {
          let result = { fromStartDate: event.from, toStartDate: event.to }
          this.$store.dispatch('products/setActiveFilterOptions', result)
        }
      },
      deleteDate() {
        let result = { fromStartDate: null, toStartDate: null }
        this.$store.dispatch('products/setActiveFilterOptions', result)
      },
      deleteOptions() {
        let result = {
          timeOfDayFrom: null, //in minutes
          timeOfDayTo: null, //in minutes
          durationDaysFrom: null,
          durationDaysTo: null,
          durationMinutesFrom: null,
          durationMinutesTo: null
        }
        this.$store.dispatch('products/setActiveFilterOptions', result)
      },
      deletePrice() {
        let result = { priceFrom: null, priceTo: null }
        this.$store.dispatch('products/setActiveFilterOptions', result)
      },

      setSelectOptions(value, initialArray) {

        let init = {};
        let result = {};
        initialArray.forEach(item => {
          if (item.field) {
            init[item.field] = null;
          }
        })
        if (value) {
          if (!value.name) {
            value.forEach((item) => {
              if (item.field) {
                result[item.field] = item.checkedValue;
              }
            })
          } else {
            if (Object.keys(value).length !== 0) {
              let result = {};
              if (value.field) {
                result[value.field] = value.checkedValue;
              }
            }
          }
        }
        result = Object.assign(init, result)
        this.$store.dispatch('products/setActiveFilterOptions', result)
      },
      setSelectOptionsObjects(value, initialArray) {

        let init = {};
        let result = {};
        initialArray.forEach(item => {
          for (let index in item.checkedValue) {
            init[index] = null;
          }
        })
        if (value) {
          if (!value.name) {
            value.forEach((item) => {
              if (item.checkedValue) {
                for (let index in  item.checkedValue) {
                  result[index] = item.checkedValue[index];
                }
              }
            })
          } else {
            if (Object.keys(value).length !== 0) {
              for (let index in  value.checkedValue) {
                result[index] = value.checkedValue[index];
              }
            }
          }
        }
        result = Object.assign(init, result)
        this.$store.dispatch('products/setActiveFilterOptions', result)
      },
      onActiveColumn(i) {
        this.activeColumn = i
      },
      turnPage(pageNumber) {
        this.$store.dispatch('products/setActiveFilterOptions', { page: pageNumber })

      }
    },
    computed: {
      ...mapState('products', ['products', 'searchInfo', 'activeFilters']),
      ...mapState('ui', ['searchHeaderItems', 'chosenHeaderItem','showHeaderSearch']),
      durationTitle() {
        let resItem = this.dayOptions.find(item => item.value)
        return resItem ? resItem.name : '';
      },
      priceTitle() {
        if (this.activeFilters.priceFrom || this.activeFilters.priceTo) {
          const from = this.activeFilters.priceFrom ? this.activeFilters.priceFrom : '0';
          const to = this.activeFilters.priceTo ? this.activeFilters.priceTo : '0';
          return '$' + from + ' - ' + '$' + to;
        } else {
          return '';
        }


      },
      moreTitle() {
        return this.activeFilters.isFreeCancellation || this.activeFilters.isInstantBooking ? ' ' : '';
      },
      dateTitle() {

        let from = this.activeFilters.fromStartDate;
        let to = this.activeFilters.toStartDate;
        if (from && to) {
          return moment(from).format('DD MMM') + ' - ' + moment(to).format('DD MMM')
        } else {
          return '';
        }

      },
      dayOptions() {

        let defArray = [
          { id: 1, name: 'Up to 1 hour', value: false, checkedValue: { durationMinutesTo: 60 } },
          {
            id: 2,
            name: '1 to 4 hours',
            value: false,
            checkedValue: { durationMinutesFrom: 60, durationMinutesTo: 240 }
          },
          {
            id: 3,
            name: '4 hours to 1 day',
            value: false,
            checkedValue: { durationMinutesFrom: 240, durationDaysTo: 1 }
          },
          { id: 4, name: '1 to 3 days', value: false, checkedValue: { durationDaysFrom: 1, durationDaysTo: 3 } },
          { id: 5, name: '3+ days', value: false, checkedValue: { durationDaysFrom: 3 } }
        ]
        let durationMinutesTo = this.$store.state.products.activeFilters.durationMinutesTo;
        let durationDaysTo = this.$store.state.products.activeFilters.durationDaysTo;
        let durationDaysFrom = this.$store.state.products.activeFilters.durationDaysFrom;
        if (durationMinutesTo == 60) {
          defArray[0].value = true;
        } else if (durationMinutesTo == 240) {
          defArray[1].value = true;
        } else if (durationDaysTo == 1) {
          defArray[2].value = true;
        } else if (durationDaysTo == 3) {
          defArray[3].value = true;
        } else if (durationDaysFrom == 3) {
          defArray[4].value = true;
        }
        return defArray
      },
      timeOptions() {
        let defArray = [
          {
            id: 1,
            name: 'Morning',
            hint: '6am-12pm',
            value: false,
            checkedValue: { timeOfDayFrom: 360, timeOfDayTo: 720 }
          },
          {
            id: 2,
            name: 'Afternoon',
            hint: '12am-5pm',
            value: false,
            checkedValue: { timeOfDayFrom: 720, timeOfDayTo: 1020 }
          },
          {
            id: 3,
            name: 'Evening',
            hint: '5pm-12am',
            value: false,
            checkedValue: { timeOfDayFrom: 1020, timeOfDayTo: 1440 }
          }
        ];
        let timeOfDayFrom = this.$store.state.products.activeFilters.timeOfDayFrom;
        switch (timeOfDayFrom) {
          case 360:
            defArray[0].value = true;
            break;
          case 720:
            defArray[1].value = true;
            break;
          case 1020:
            defArray[2].value = true;
            break;

        }
        return defArray;
      },
      arrayMore() {
        return [
          {
            name: 'Free Cancelation',
            value: this.activeFilters.isFreeCancellation,
            checkedValue: true,
            field: 'isFreeCancellation'
          },
          // { name: 'Private tours', value: '', field: '', checkedValue: true },
          {
            name: 'Instant Booking',
            value: this.activeFilters.isInstantBooking,
            checkedValue: true,
            field: 'isInstantBooking'
          },
        ]
      },
      getBestCountryTours() {
        if (this.windowWidth <= 768) {
          return this.icelandToursArray.map(array => array.slice(0, 2))
        }
        return this.icelandToursArray
      }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'products/SET_FILTER_OPTIONS_CHOSEN') {
          this.$store.dispatch('products/refreshProducts');
        }
        if (mutation.type === 'products/SET_ACTIVE_FILTERS_OPTIONS') {
          this.$store.dispatch('products/refreshProducts');
        }
      });
    },
    mounted() {
      this.$store.dispatch('products/loadFilters');
      this.$store.dispatch('products/refreshProducts');
//      this.$store.dispatch('ui/setShowHeaderSearch', false);
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .bread-crumbs {
        display: flex;
        justify-content: flex-start;
        max-width: 1290px;
        width: 100%;
        margin-top: 14px;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tours-content {
        width: 100%;
        margin-left: 40px;
    }

    .search-tours {
        display: flex;
        width: 100%;
        max-width: 1300px;
        margin-top: 21px;
    }

    .tours-header-text {
        font-size: 32px;
        font-weight: 500;
        color: $blue-dark;
    }

    .tours-quantity {
        font-size: 13px;
        color: $blue-dark;
        display: flex;
        align-items: flex-end;
    }


    .tours-form-selectors {
        display: flex;
        width: 100%;
        justify-content: space-between;

        > div {
            margin-right: 8px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .tours-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
    }

    .input-contaioner {
        width: calc(20% - 8px);
    }

    .select-sort {
        display: flex;
        font-size: 14px;
        cursor: pointer;
    }

    .tours-sort-by {
        display: flex;
        margin-top: 28px;
        margin-bottom: 26px;
    }

    .arrow-bottom {
        margin: 3px;
    }

    .sort-by-select-text {
        font-size: 14px;
        font-weight: 500;
        color: $dark-secondary;
        margin-right: 3px;
    }

    .sort-by-text {
        font-size: 14px;
        color: $dark-secondary;
        margin-right: 10px;
    }

    .pagination {
        justify-content: flex-end;
    }

    .tour-card {
        margin-bottom: 43px;
    }

    .cont-column-box {
        display: flex;
    }

    .cont-sort-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #b5c9d5;
    }

    .two-by-two, .one-by-one {
        cursor: pointer;

        &:hover {
            color: $blue-dark;
        }
    }

    .active-column {
        color: $blue-dark;
    }

    .two-by-two {
        margin-left: 15px;
    }

    .sort-by-mobile {
        display: flex;
    }

    .filter-sort-by {
        display: none;
    }

    .tours-quantity-secondary {
        display: none;
    }

    .w-195 {
        width: 195px;
        min-width: 195px;
    }

    .is-tiled-view {
        .tours-container-inner {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -23px;
        }
    }

    @media (max-width: 1330px) {
        .tours-form-selectors-left {
            flex-direction: column;
        }

        .tours-header {
            margin-bottom: 0px;
        }

        .input-filter {
            margin-top: 5px;
            width: 100%;
        }

        .tours-content {
            margin-left: 25px;
            margin-right: 20px;
        }

        .bread-crumbs {
            width: 100%;
            margin-left: 0;
            padding-left: 25px;
            box-sizing: border-box;
        }

        .search-left-cont {
            margin-left: 20px;
        }

        .tours-quantity {
            padding-bottom: 10px;
        }

        .tours-sort-by {
            margin-top: 20px;
        }
    }


    @media (max-width: 768px) {
        .tours-header {
            display: none;
        }

        .search-tours {
            flex-direction: column;
            padding: 20px;
            margin-top: 0;
            padding-top: 10px;
        }

        .search-left-cont {
            margin-left: 0;
            box-sizing: border-box;
        }

        .harmonic-select {
            display: none;
        }

        .tours-content {
            margin-left: 0;
        }

        .hiding-input {
            display: none;
        }

        .tours-form-selectors-left {
            flex-direction: row;
        }

        .input-cla {
            margin-right: 9px;
        }

        .tours-sort-by {
            display: none;
        }

        .cont-sort-box {
            align-items: center;
            margin: 15px 2px;
        }

        .tours-quantity {
            padding-bottom: 0;
        }

        .cont-sort-box {
            color: $blue;
        }

        .filter-sort-by {
            display: flex;
        }

        .filter-sort {
            display: flex;
        }

        .sorting-filter-icon {
            margin: 0 3px 0 10px;
        }

        .sort-by-mobile, .filter-sort {
            cursor: pointer;
        }

        .tours-quantity-secondary {
            display: flex;
        }
    }

    label.select-label {
        font-weight: 700;
        color: $dark-secondary;
        font-family: Quicksand;
        font-size: 13px;
        text-decoration: none solid rgb(1, 8, 12);
        padding: 15px 0 0 12px;
    }

    .tours-header-text{
        margin-left: 0px !important;
        line-height: 0.8;
    }
    .tours-header-text .search-mini{
        margin-left: 0px !important;
    }
</style>
<!---->
