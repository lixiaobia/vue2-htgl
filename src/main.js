import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './permission'c
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
