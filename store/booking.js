import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'
import nuxtStorage from 'nuxt-storage';

export const state = () => ({
  chosenDate: null,
  myBookings: [],
  myCanceledBookings: [],
  activeBookingOptions: {
    currentTourChosenGroups: {},
    time: null
  },
  currentTourGroupIds: {},
  paymentMethods: [],
  paypalData: {},
  booking: {},
  bookingLoading: false
})

export const mutations = {
  SET_BOOKING_LOADING: (state, payload) => state.bookingLoading = payload,
  SET_MY_BOOKINGS: (state, payload) => state.myBookings = payload,
  SET_MY_CANCEL_BOOKINGS: (state, payload) => state.myCanceledBookings = payload,
  SET_ACTIVE_BOOKING_OPTIONS: (state, data) => {
    for (let item in data) {
      if (state.activeBookingOptions[item] !== undefined) {
        Vue.set(state.activeBookingOptions, item, data[item])
      }
    }
    nuxtStorage.localStorage.setData('activeBookingOptions', state.activeBookingOptions)
  },
  SET_ACTIVE_BOOKING_OPTIONS_ALL: (state, data) => {
    state.activeBookingOptions = data
  },
  SET_ACTIVE_BOOKING_DATE: (state, data) => {
    state.chosenDate = data
    nuxtStorage.localStorage.setData('chosenDate', data)
  },
  REFRESH_TIME: (state, data) => {
    state.activeBookingOptions.time = null
  },
  SET_PAYMENT_METHODS: (state, data) => {
    state.paymentMethods = data
  },
  SET_PAYPAL_DATA: (state, data) => {
    state.paypalData = data
  },
  SET_BOOKING: (state, data) => {
    state.booking = data
  },
  SET_CURRENT_TOUR_GROUP_IDS: (state, data) => {
    nuxtStorage.localStorage.setData('currentTourGroupIds', data)
    state.currentTourGroupIds = data;
    Vue.set(state, 'currentTourGroupIds', data)
  },

}

export const actions = {
    async getMyBookings({state, commit}, id) {
        const myBookings = await apiRequest.get('bookings?userId=' + id + '&confirmationStatuses=confirmed,pending&inFuture=1&paymentWasMade=1')
        commit('SET_MY_BOOKINGS', myBookings.data)
    },
    async getMyCanceledBookings({state, commit}, id) {
        const myBookings = await apiRequest.get('bookings?userId=' + id + '&notInFutureOrConfirmationStatus,CancelledDeclined=1&paymentWasMade=1')
        commit('SET_MY_CANCEL_BOOKINGS', myBookings.data)
    },
  setBookingOprions({ state, commit }, data) {
    commit('SET_ACTIVE_BOOKING_OPTIONS', data)
  },
  setBookingDate({ state, commit }, data) {

    commit('SET_ACTIVE_BOOKING_DATE', data)
    commit('REFRESH_TIME')
  },
  async getPaymentMethods({ state, commit }) {
    const { data } = await apiRequest.post('payment-methods')
    commit('SET_PAYMENT_METHODS', data)
  },
  async createBooking({ state, commit, dispatch }, body) {
    try {
      if (!state.bookingLoading) {
        commit('SET_BOOKING_LOADING', true)
        const { data } = await apiRequest.post('bookings', body)

        dispatch('getBookingOrder', data.code)
        commit('SET_BOOKING_LOADING', false)
      }
    } catch (e) {
      commit('SET_BOOKING_LOADING', false)
      Vue.notify({
        type: 'error',
        group: 'bookings',
        title: 'Bookings',
        text: 'Booking has not been created',
        duration: 1500,
        speed: 1000
      })
      for (let key in e) {
        if (e.hasOwnProperty(key)) {
          e[key].forEach(function (element, index) {
            Vue.notify({
              type: 'error',
              group: 'bookings',
              title: 'Bookings',
              text: element,
              duration: 3500,
              speed: 1000
            })
          })
        }
      }
    }
  },
  async getBookingOrder({ state, commit }, code) {
    try {
      const { data } = await apiRequest.get('bookings/paypal-purchase-unit/' + code)
      commit('SET_PAYPAL_DATA', data)
    } catch (e) {}
  },
  async getBooking({ state, commit }, id) {
    try {
      const { data } = await apiRequest.get('bookings/by-code/' + id)
      commit('SET_BOOKING', data)
    } catch (e) {}
  },
  nullPayPal({ state, commit }) {
    try {
      commit('SET_PAYPAL_DATA', {})
    } catch (e) {}
  },
  getChosenDate({ state, commit }) {
    try {
      const storedData = nuxtStorage.localStorage.getData('chosenDate')
      if (!state.chosenDate && storedData){
        commit('SET_ACTIVE_BOOKING_DATE', storedData)
      }
      const storedActiveBookingOptions = nuxtStorage.localStorage.getData('activeBookingOptions')
      if (!state.activeBookingOptions.time && storedActiveBookingOptions) {
        commit('SET_ACTIVE_BOOKING_OPTIONS_ALL', storedActiveBookingOptions)
      }
      const currentStored = nuxtStorage.localStorage.getData('currentTourGroupIds')
      if (!state.currentTourGroupIds.length && currentStored) {
        commit('SET_CURRENT_TOUR_GROUP_IDS', currentStored)
      }
    } catch (e) {
    }
  },

}
