import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
  destinations: [],
  currentDestination: {}
})

export const mutations = {
  SET_DESTINATIONS: (state, payload) => state.destinations = payload,
  SET_CURRENT_DESTINATION: (state, payload) => state.currentDestination = payload
}

export const actions = {
  async getDestinations({ state, commit }, id) {
    const destinations = await apiRequest.get('destinations?expand=frontPageContent&hasProducts=1')
    commit('SET_DESTINATIONS', destinations.data)
  },
  async getCurrentDestination({ state, commit, dispatch }, id) {
    const currentDestination = await apiRequest.get('destinations/by-slug/' + id + '?expand=frontPageContent')
    commit('SET_CURRENT_DESTINATION', currentDestination.data)
  }
}
