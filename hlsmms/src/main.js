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

// 构造全局守卫
router.beforeEach((to,from,next)=>{
  // let islogin = false;
  axios.defaults.withCredentials=true;
  axios.get('http://localhost:9090/users/getcookie')
  .then(result=>{
    if(result.data.isOk || to.path=="/login"){
      next();
    }else{
      next("/login");
    }
  }).catch(err=>{
    console.error("错误："+err.message);
  })
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
