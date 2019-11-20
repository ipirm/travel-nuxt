import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  countryTexts: [],
  currentText: {}
})

export const mutations = {
  SET_COUNTRY_TEXTS: (state, payload) => state.countryTexts = payload,
  SET_CURRENT_TEXT: (state, payload) => state.currentText = payload
}

export const actions = {
  async getCountryTexts({ state, commit }, id) {
    const countryTexts = await apiRequest.get('text-pages?countryId=' + id)
    commit('SET_COUNTRY_TEXTS', countryTexts.data)
  },
  async getCurrentText({ state, commit }, id) {
    const currentText = await apiRequest.get('text-pages/by-slug/' + id)
    commit('SET_CURRENT_TEXT', currentText.data)
  },
}
