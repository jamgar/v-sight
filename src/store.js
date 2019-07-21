import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    total: 0,
    totalPages: 0,
    loading: false
  },
  mutations: {
    UPDATE_ORDERS(state, payload) {
      state.orders = payload.data.page.data
      state.totalPages = payload.data.totalPages
      state.orders = payload.data.page.data
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async getOrders({ commit }, pageInfo) {
      commit('SET_LOADING', true)

      await axios
        .get(
          `https://localhost:5001/api/order/${pageInfo.page}/${
            pageInfo.perPage
          }`
        )
        .then(response => {
          commit('UPDATE_ORDERS', response)
          commit('SET_LOADING', false)
        })
    }
  }
})
