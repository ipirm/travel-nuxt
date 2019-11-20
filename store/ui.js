import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  loading: false,
  queue: [],
  max: 5,
  currency: [],
  itemErrors: {},
  itemsErrors: {},
  phoneIndexes: [],
  phoneIndexesCore: [],
  counter: 0,
  searchHeaderItems: {},
  chosenHeaderItem: {},
  showHeaderSearch: false
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  decrement(state) {
    state.counter--
  },
  SET_SHOW_HEADER_SEARCH: (state, payload) => state.showHeaderSearch = payload ? payload : false,
  SET_HEADER_SEARCH_ITEMS: (state, payload) => state.searchHeaderItems = payload ? payload : {},
  SET_HEADER_CHOSEN_ITEM: (state, payload) => state.chosenHeaderItem = payload ? payload : {},
  SET_PHONE_INDEXES: (state, payload) => {
    state.phoneIndexes = payload.map(item => item.international_calling_code)
    state.phoneIndexesCore = payload
  },
  SET_LOADING: (state, payload) => state.loading = payload,
  SET_CURRENCY: (state, payload) => state.currency = payload,
  RESET_ITEM_ERRORS: state => state.itemErrors = [],
  RESET_ITEM_ERROR: state => state.itemErrors = [],
  PUSH_NOTIFY: (state, notification) => {
    state.queue.push(notification)

    if (state.queue.length > state.max) {
      state.queue.shift()
    }
  },
  SET_ITEM_ERRORS(state, errors) {
    state.loading = false
    state.itemErrors = errors
  }
}

export const actions = {
  increment({ state, commit }) {
    commit('increment')
  },
  decrement({ state, commit }) {
    commit('decrement')
  },
  async getSearchItems({ state, commit }, searchText) {
    let { data } = await this.$axios.get('api/search-by-query', {
      params: { query: searchText }
    });
    commit('SET_HEADER_SEARCH_ITEMS', data)
  },

  blurSearchItems({ state, commit }) {
    commit('SET_HEADER_SEARCH_ITEMS', {})
  },

  setSearchItem({ state, commit }, item) {
    commit('SET_HEADER_CHOSEN_ITEM', item)
  },
  setSearchItems({ state, commit }, item) {
    commit('SET_HEADER_SEARCH_ITEMS', item)
  },
  setShowHeaderSearch({ state, commit }, item) {
    commit('SET_SHOW_HEADER_SEARCH', item)
  },

  async getPhoneIndexes({ state, commit }) {
    // if (state.phoneIndexes.length) return

    try {
      const { data } = await apiRequest.get('country/international-calling-codes')
      commit('SET_PHONE_INDEXES', data)
    } catch (e) {
      console.log(e)
    }
  },

  async getCurrency({ commit }) {
    try {
      const currency = await this.$axios.getPublic('currencies')
      commit('SET_CURRENCY', currency.data)
    } catch (e) {
      console.log(e)
    }
  }
}
