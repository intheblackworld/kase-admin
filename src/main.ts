import Vue from 'vue'
import './plugins/vuetify'
import App from '@/App.vue'
import router from '@/routers'
import store from '@/store'

import '@/assets/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
