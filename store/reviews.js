import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
    reviews: [],
})

export const mutations = {
    SET_REVIEWS: (state, payload) => {
                  console.log('Store 22');
        state.reviews = payload
    },
    SET_REVIEW: (state, payload) =>{
        state.reviews.product_id = payload.product_id
        state.reviews.rating = payload.rating
        state.reviews.text = payload.text
    },
}

export const actions = {
    async getReviews({state, commit}, id) {
        const reviews = await apiRequest.get(`reviews?productId=${id}&per-page=1000`)
        commit('SET_REVIEWS', reviews.data)
    },

    async addReview({state, commit}, body) {
        const review = await apiRequest.post('reviews',body);
        commit('SET_REVIEW', body)
    },
}
