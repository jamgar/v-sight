import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Sales',
      name: 'sales',
      component: () => import('./views/SectionSales.vue')
    },
    {
      path: '/Orders',
      name: 'orders',
      component: () => import('./views/SectionOrders.vue')
    },
    {
      path: '/Health',
      name: 'health',
      component: () => import('./views/SectionHealth.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
