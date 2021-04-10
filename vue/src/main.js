import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$api = "http://localhost:5000/api"
Vue.$api = "http://localhost:5000/api"


new Vue({
  render: h => h(App),
}).$mount('#app')
