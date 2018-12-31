import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 公共样式
import './assets/style/public.css'

// 引入axios
import axios from 'axios'
//把axios挂载在vue的原型上
Vue.prototype.axios = axios;
// 引入qs处理axios的post参数
import qs from 'qs';
// 挂载到原型上
Vue.prototype.qs = qs;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
