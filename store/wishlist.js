import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
    wishlist: [],
    userWishlist: []
})

export const mutations = {
    SET_WISH_LIST: (state, payload) => state.wishlist = payload,
    GET_WISH_LIST: (state, payload) => state.userWishlist = payload,
}

export const actions = {
    async getWishList({state, commit}, key) {
        const wishlist = await apiRequest.get(`products-search/products?isInUserWishList=1&expand=minPrice,city,productPhotos,isAvailableToday?expand=rating,reviewsCount,totalBooked?per-page=12?page=${key}?page-count`)
        commit('SET_WISH_LIST', wishlist.data)
    },
    async addWishList({state, commit}, id) {
        const wishlist = await apiRequest.post(`wish-product/${id}`)
    },
    async getUserWishList({state, commit}) {
        const wishlist = await apiRequest.get(`products-search/products?isInUserWishList=1`)
        commit('GET_WISH_LIST', wishlist.data)
    },
    async removeWishList({state, commit}, id) {
        const wishlist = await apiRequest.delete(`wish-product/${id}`)
    }
}
