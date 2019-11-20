import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  cities: [],
  currentCity: {}
})

export const mutations = {
  SET_CITIES: (state, payload) => state.cities = payload,
  SET_CURRENT_CITY: (state, payload) => state.currentCity = payload
}

export const actions = {
  async getCities({ state, commit, dispatch }, id) {
    const cities = await apiRequest.get('cities?expand=frontPageContent&hasProducts=1&per-page=16')
    dispatch('chunk', cities.data)
  },
  async getCurrentCity({ state, commit, dispatch }, id) {
    const currentCity = await apiRequest.get('cities/by-slug/' + id + '?expand=frontPageContent')
    commit('SET_CURRENT_COUNTRY', currentCity.data)
  },

  chunk({ commit }, array) {
    const size = 3;
    const chunkedArr = []
    for (let i = 0; i < array.length; i++) {
      const last = chunkedArr[chunkedArr.length - 1]
      if (!last || last.length === size) {
        chunkedArr.push([array[i]])
      } else {
        last.push(array[i]);
      }
    }
    commit('SET_CITIES', chunkedArr)
  }

}
