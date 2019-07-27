import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    ordersByCustomer: [],
    ordersByState: [],
    total: 0,
    totalPages: 0,
    loading: false
  },
  mutations: {
    SET_ORDERS(state, payload) {
      state.orders = payload.data.page.data
      state.totalPages = payload.data.totalPages
      state.orders = payload.data.page.data
    },
    SET_ORDERS_BY_CUSTOMERS(state, payload) {
      state.ordersByCustomer = payload.data
    },
    SET_ORDERS_BY_STATE(state, payload) {
      state.ordersByState = payload
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
          commit('SET_ORDERS', response)
          commit('SET_LOADING', false)
        })
    },
    async getOrdersByCustomer({ commit }, number) {
      commit('SET_LOADING', true)

      await axios
        .get(`https://localhost:5001/api/order/bycustomer/${number}`)
        .then(response => {
          commit('SET_ORDERS_BY_CUSTOMERS', response)
          commit('SET_LOADING', false)
        })
    },
    async getOrdersByState({ commit }, number = 6) {
      commit('SET_LOADING', true)

      await axios
        .get(`https://localhost:5001/api/order/bystate/`)
        .then(response => {
          commit('SET_ORDERS_BY_STATE', response.data.slice(0, number))
          commit('SET_LOADING', false)
        })
    }
  }
})
