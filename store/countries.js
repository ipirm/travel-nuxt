import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  countries: [],
  onlyCountries: [],
  currentCountry: {},
  operatorCountries: [],
  operatorCountriesCore: []
})

export const mutations = {
  SET_ONLY_COUNTRIES: (state, countries) => state.onlyCountries = countries,
  SET_COUNTRIES: (state, payload) => state.countries = payload,
  SET_CURRENT_COUNTRY: (state, payload) => state.currentCountry = payload,
  SET_OPERATOR_COUNTRIES: (state, payload) => {
    state.operatorCountries = payload.map(item => item.name)
    state.operatorCountriesCore = payload
  },
}

export const actions = {
  async getOnlyCountries({ state, commit }) {
    const countries = await apiRequest.get('group-of-countries?expand=countries')
    commit('SET_ONLY_COUNTRIES', countries.data)
  },
  async getCountriesOperator({ state, commit }) {
    const countries = await apiRequest.get('countries?per-page=300')
    commit('SET_OPERATOR_COUNTRIES', countries.data)
  },
  async getCountries({ state, commit }, id) {
    const countries = await apiRequest.get('countries?expand=frontPageContent&hasProducts=1')
    commit('SET_COUNTRIES', countries.data)
  },
  async getCurrentCountry({ state, commit, dispatch }, id) {
    const currentCountry = await apiRequest.get('countries/by-slug/' + id + '?expand=frontPageContent')
    commit('SET_CURRENT_COUNTRY', currentCountry.data)
  },
}
