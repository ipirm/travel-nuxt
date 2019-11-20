import Vue from 'vue'
import apiRequest from '@/utils/apiRequest'

export const state = () => ({
    user: {}
})

export const mutations = {
    SET_FULLNAME: (state, payload) => Vue.set(state.user, 'full_name', payload),
    SET_BIRTHDAY: (state, payload) => Vue.set(state.user, 'date_of_birth', payload),
    SET_LOCATION: (state, payload) => Vue.set(state.user, 'location', payload),
    SET_GENDER: (state, payload) => Vue.set(state.user, 'gender', payload),
    SET_PHONE_ID: (state, payload) => Vue.set(state.user, 'phone_country_id', payload),
    SET_PHONE_NUMBER: (state, payload) => Vue.set(state.user, 'phone_number', payload),
    SET_AVATAR: (state, payload) => (state.user.avatarUrl = payload),
    SET_USER: (state, payload) => state.user = payload
}

export const actions = {
    async getProfile({commit}) {
        try {
            const {data} = await apiRequest.get('customer')
            commit('SET_USER', data)
        } catch (e) {
            commit('SET_USER', {})
        }
    },

    async login({dispatch, commit}, user) {
        try {
            commit('ui/SET_LOADING', true, {root: true})
            const {data} = await apiRequest.post('customer/login', user)
            dispatch('setAccessToken', data.access_token)
            dispatch('setAuthData', data)
            this.$router.push({path: '/'})
            commit('ui/SET_LOADING', false, {root: true})
            commit('ui/PUSH_NOTIFY', {
                type: 'success',
                group: 'alert',
                title: 'Login',
                text: `You logged in successfully!`
            }, {root: true})
        } catch (e) {
            commit('ui/SET_ITEM_ERRORS', e, {root: true})
            commit('ui/SET_LOADING', false, {root: true})
        }
    },

    async signup({commit, dispatch}, body) {
        try {
            commit('ui/SET_LOADING', true, {root: true})
            await apiRequest.post('customer/signup', body)

            await dispatch('login', {
                method: 'basic',
                data: {
                    username: body.email,
                    password: body.password
                }
            })
            this.$router.push({path: '/'})
            commit('ui/SET_LOADING', false, {root: true})
            commit('ui/PUSH_NOTIFY', {
                type: 'success',
                group: 'alert',
                title: 'Sign Up',
                text: `You signed up successfully! Please log in with your credentials.`
            }, {root: true})
        } catch (e) {
            commit('ui/SET_ITEM_ERRORS', e, {root: true})
            commit('ui/SET_LOADING', false, {root: true})
        }
    },

    async logout({dispatch, commit}) {
        try {
            await apiRequest.post('customer/logout', {token: localStorage.getItem('refreshToken')})
            dispatch('resetProfile')
            commit('ui/PUSH_NOTIFY', {
                type: 'success',
                group: 'alert',
                title: 'Log out',
                text: `You logged out successfully!.`
            }, {root: true})
        } catch (e) {
            console.log(e)
        }
    },

    async setAvatar({commit}, payload) {
        const data = await apiRequest.post('customer/avatar', payload)
        commit('SET_AVATAR', data.avatarUrl)
    },

    async changePassword(_, payload) {
        const dataPass = await apiRequest.$post('customer/change-password', payload)
        return dataPass
    },

    setAccessToken(accessToken) {
        this.$axios.defaults.headers.common.Authorization = accessToken
    },

    resetProfile({commit}) {
        // Reset LocalStorage auth data
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('userRole')
        commit('SET_USER', {})
    },

    setAuthData({commit}, auth) {
        // Set LocalStorage auth data
        localStorage.setItem('expiresIn', auth.expires_in)
        localStorage.setItem('accessToken', auth.access_token)
        localStorage.setItem('refreshToken', auth.refresh_token)
    }
}
