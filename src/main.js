import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
