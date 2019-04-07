import Vue from 'vue'
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/g-styles.css'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
