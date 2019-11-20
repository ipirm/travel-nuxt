import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  filters: [],
  products: [],
  isUserCanAddReview: false,
  currentProduct: {},
  searchInfo: {
    pageCount: 1,
    totalCount: 2
  },
  activeFilters: {
    page: 1,
    'per-page': 2,
    fromStartDate: null,
    toStartDate: null,
    timeOfDayFrom: null, //in minutes
    timeOfDayTo: null, //in minutes
    durationDaysFrom: null,
    durationDaysTo: null,
    priceFrom: null,
    priceTo: null,
    durationMinutesFrom: null,
    durationMinutesTo: null,
    isFreeCancellation: null,
    isInstantBooking: null,
    cityId: null,
    country_id:null,
    query:null,
    id:null,
  },
  sliderProducts: [],
  featuredProducts: [],
  mixedProducts: [],
  countryProducts: [],
  countryFeaturedProducts: [],
  countryBestProducts: []
})

export const mutations = {
  SET_CURRENT_PRODUCT: (state, payload) => state.currentProduct = payload,
  SET_SEARCH_INFO: (state, payload) => {
    state.searchInfo.pageCount = payload['x-pagination-page-count'] ? parseInt(payload['x-pagination-page-count']) : 0;
    state.searchInfo.totalCount = payload['x-pagination-total-count'] ? parseInt(payload['x-pagination-total-count']) : 0;
    if (parseInt(payload['x-pagination-current-page']) != state.activeFilters.page) {
      state.activeFilters.page = parseInt(payload['x-pagination-current-page']);
    }


  },
  SET_PRODUCTS: (state, payload) => state.products = payload,
  SET_ACTIVE_FILTERS_OPTIONS: (state, data) => {
    for (let item in data) {
      if (state.activeFilters[item] !== undefined) {
        state.activeFilters[item] = data[item]
      }
    }
  },
  SET_FILTERS: (state, payload) => {
    state.filters = payload;
  },
  SET_FILTER_OPTION: (state, index) => {
    state.filters[index].active = !state.filters[index].active;
  },
  SET_FILTER_OPTIONS: (state, indexArray) => {
    if (indexArray.length == 2) {
      state.filters[indexArray[0]].items[indexArray[1]].active = !state.filters[indexArray[0]].items[indexArray[1]].active
    } else {
      state.filters[indexArray[0]].items[indexArray[1]].childs[indexArray[2]].active = !state.filters[indexArray[0]].items[indexArray[1]].childs[indexArray[2]].active
    }

  },
  SET_FILTER_OPTIONS_CHOSEN: (state, indexArray) => {
    if (indexArray.length == 2) {
      state.filters[indexArray[0]].items[indexArray[1]].chosen = !state.filters[indexArray[0]].items[indexArray[1]].chosen
    } else {
      state.filters[indexArray[0]].items[indexArray[1]].childs[indexArray[2]].chosen = !state.filters[indexArray[0]].items[indexArray[1]].childs[indexArray[2]].chosen
    }

  },
  SET_FILTER_BRANCH: (state, payload) => {
    Vue.set(state.filters[payload.index], 'items', payload.result)
  },
  SET_SLIDER_PRODUCTS: (state, payload) => state.sliderProducts = payload,
  SET_FEATURED_PRODUCTS: (state, payload) => state.featuredProducts = payload,
  SET_MIXED_PRODUCTS: (state, payload) => state.mixedProducts = payload,
  SET_COUNTRY_PRODUCTS: (state, payload) => state.countryProducts = payload,
  SET_COUNTRY_FEATURED_PRODUCTS: (state, payload) => state.countryFeaturedProducts = payload,
  SET_COUNTRY_BEST_PRODUCTS: (state, payload) => state.countryBestProducts = payload,
  SET_REVIEWS_COUNT:  (state, payload) =>{
    state.currentProduct.reviewsCount = ++payload;
  },
  SET_USER_PERMISION: (state, payload) => state.isUserCanAddReview = payload[0].isUserCanAddReview
}

export const actions = {
  updateReviewsCount({state, commit}, body) {
    commit('SET_REVIEWS_COUNT', body)
  },

  async loadFilters({ state, commit }) {
    let res = await this.$axios.get('api/product-types')
    res.data.forEach((item) => {
      item['active'] = false;
    });
    commit('SET_FILTERS', res.data)
    res.data.forEach(async (item, index) => {
      let id = item.id;
      let result = await this.$axios.get('api/product-types/' + id + '/categories-tree');
      result.data.forEach((data) => {
        data['active'] = false;
        data['chosen'] = false;
        if (data.childs && data.childs.length) {
          data.childs.forEach((child) => {
            child['active'] = false;
            child['chosen'] = false;
          })
        }
      });
      commit('SET_FILTER_BRANCH', { index: index, result: result.data })
    })

  },
//
  setActiveFilter({ state, commit }, indexArray) {
    commit('SET_FILTER_OPTIONS', indexArray);
  },

  setActiveFilterOptions({ state, commit }, data) {
    commit('SET_ACTIVE_FILTERS_OPTIONS', data);
  },
  async refreshProducts({ state, commit }) {
    let expand = 'minPrice,isAvailableToday, firstPointOfPickUp, operator,language,typeCategoriesList,productType,themeCategoriesList,whatsIncludedCategoriesList,whatsExcludedCategoriesList,groupEnjoyCategoriesList,travelerEnjoyCategoriesList,healthRestrictionCategoriesList,productPhotos,productPhysicalRestrictions,productPickUpDropOff,productDays,productGuides,cancellationPolicy,ticket,progress,bookingProcess,bookingNeededInformationFromTraveler';
    let filter = { expand: expand };
    for (let item in state.activeFilters) {
      if (state.activeFilters[item]) {
        filter[item] = state.activeFilters[item]
      }
    }
    for (let item in state.activeFilters) {
      if (state.activeFilters[item] !== null) {
        filter[item] = state.activeFilters[item]
      }
    }

    let chosenFilterArray = [];
    state.filters.forEach((item1) => {
      if (item1.items) {
        item1.items.forEach((item2) => {
          if (item2.chosen) chosenFilterArray.push(parseInt(item2.id))
          if (item2.childs) {
            item2.childs.forEach(item3 => {
              if (item3.chosen) chosenFilterArray.push(parseInt(item3.id))
            })
          }
        })
      }
    })
    if (chosenFilterArray.length) {
      filter['productTypeCategories'] = chosenFilterArray;
    }

    let { data, headers } = await this.$axios.get('api/products-search/products', {
      params: filter
    });


    commit('SET_PRODUCTS', data);
    commit('SET_SEARCH_INFO', headers);
  },

  async getReviewPermision({state, commit}, id) {
    const data = await apiRequest.get(`products-search/products?expand=isUserCanAddReview&id=${id}`);
    commit('SET_USER_PERMISION', data.data)
  },

  async getCurrentProduct({ state, commit }, id) {
    let expand = 'productPriceSettings,availableSheldule,minPrice,isAvailableToday, firstPointOfPickUp, operator,language,typeCategoriesList,productType,themeCategoriesList,whatsIncludedCategoriesList,whatsExcludedCategoriesList,groupEnjoyCategoriesList,travelerEnjoyCategoriesList,healthRestrictionCategoriesList,productPhotos,productPhysicalRestrictions,productPickUpDropOff,productDays,productGuides,cancellationPolicy,ticket,progress,bookingProcess,bookingNeededInformationFromTraveler,isUserCanAddReview,rating,reviewsCount,ratingStats,city';
    let filter = { expand: expand, id: id };


    let { data } = await this.$axios.get('api/products-search/products', {
      params: filter
    });
    if (data && data.length) {
      commit('SET_CURRENT_PRODUCT', data[0]);

      let result = {};
      let currentTourChosenGroups = { currentTourChosenGroups: {} };
      if (data[0].productPriceSettings.ageGroups) {
        data[0].productPriceSettings.ageGroups.forEach(item => {
          result[item.id] = { name: item.categoryName, description: (item.min_age + '-' + item.max_age) }
          currentTourChosenGroups.currentTourChosenGroups[item.id] = Object.keys(currentTourChosenGroups.currentTourChosenGroups).length === 0 ? 1 : 0;
        })
      }
      commit('booking/SET_CURRENT_TOUR_GROUP_IDS', result, { root: true });
      commit('booking/SET_ACTIVE_BOOKING_OPTIONS', currentTourChosenGroups, { root: true });

    }

  },

  async getCurrentProductBooking({ state, commit }, id) {
    let expand = 'productPriceSettings,availableSheldule,minPrice,isAvailableToday, firstPointOfPickUp, operator,language,typeCategoriesList,productType,themeCategoriesList,whatsIncludedCategoriesList,whatsExcludedCategoriesList,groupEnjoyCategoriesList,travelerEnjoyCategoriesList,healthRestrictionCategoriesList,productPhotos,productPhysicalRestrictions,productPickUpDropOff,productDays,productGuides,cancellationPolicy,ticket,progress,bookingProcess,bookingNeededInformationFromTraveler';
    let filter = { expand: expand, id: id };


    let { data } = await this.$axios.get('api/products-search/products', {
      params: filter
    });
    if (data && data.length) {
      commit('SET_CURRENT_PRODUCT', data[0]);

      let result = {};
      let currentTourChosenGroups = { currentTourChosenGroups: {} };
      if (data[0].productPriceSettings.ageGroups) {
        data[0].productPriceSettings.ageGroups.forEach(item => {
          result[item.id] = { name: item.categoryName, description: (item.min_age + '-' + item.max_age) }
          currentTourChosenGroups.currentTourChosenGroups[item.id] = Object.keys(currentTourChosenGroups.currentTourChosenGroups).length === 0 ? 1 : 0;
        })
      }
      // commit('booking/SET_CURRENT_TOUR_GROUP_IDS', result, { root: true });
      // commit('booking/SET_ACTIVE_BOOKING_OPTIONS', currentTourChosenGroups, { root: true });

    }

  },

  setChosenFilter({ state, commit, dispatch }, indexArray) {
    commit('SET_FILTER_OPTIONS_CHOSEN', indexArray);
  },

  setActiveFilterOption({ state, commit }, index) {
    commit('SET_FILTER_OPTION', index)
  },

  async searchProducts({ state, commit }) {
    const res = await this.$axios.get('api/products-search/products')
    commit('SET_PRODUCTS', res)
  },

  async getSliderProducts({ state, commit }, id) {
    const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city,promo&isPromo=1')
    commit('SET_SLIDER_PRODUCTS', products.data)
  },
  async getFeaturedProducts({ state, commit }, id) {
    const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&isFeaturedActivity=1')
    commit('SET_FEATURED_PRODUCTS', products.data)
  },
  async getMixedProducts({ state, commit }, id) {
    const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&isBestTour=1')
    commit('SET_MIXED_PRODUCTS', products.data)
  },
  async getCountryProducts({ state, commit }, body) {
    if (body.type === 'City') {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&cityId=' + body.id)
      commit('SET_COUNTRY_PRODUCTS', products.data)
    } else {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&countryId=' + body.id)
      commit('SET_COUNTRY_PRODUCTS', products.data)
    }
  },
  async getCountryFeaturedProducts({ state, commit }, body) {
    if (body.type === 'City') {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&isFeaturedActivity=1&cityId=' + body.id)
      commit('SET_COUNTRY_FEATURED_PRODUCTS', products.data)
    } else {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&isFeaturedActivity=1&countryId=' + body.id)
      commit('SET_COUNTRY_FEATURED_PRODUCTS', products.data)
    }
  },
  async getCountryBestProducts({ state, commit }, body) {
    if (body.type === 'City') {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&cityId=' + body.id)
      commit('SET_COUNTRY_BEST_PRODUCTS', products.data)
    } else {
      const products = await apiRequest.get('products-search/products?expand=progress,productPhotos,minPrice,productDays,city&countryId=' + body.id)
      commit('SET_COUNTRY_BEST_PRODUCTS', products.data)
    }
  }
}
