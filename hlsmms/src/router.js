import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/useradd',
      component: () => import(/* webpackChunkName: "about" */ './views/UserAdd.vue')
    },
    {
      path: '/userlist',
      component: () => import(/* webpackChunkName: "about" */ './views/UserList.vue')
    },
    {
      path: '/userpwdedit',
      component: () => import(/* webpackChunkName: "about" */ './views/UserpwdEdit.vue')
    },
    {
      path: '/sortmanagement',
      component: () => import(/* webpackChunkName: "about" */ './views/SortManagement.vue')
    },
    {
      path: '/addsort',
      component: () => import(/* webpackChunkName: "about" */ './views/AddSort.vue')
    },
    {
      path: '/goodscontrol',
      component: () => import(/* webpackChunkName: "about" */ './views/GoodsControl.vue')
    },
    {
      path: '/addproduct',
      component: () => import(/* webpackChunkName: "about" */ './views/AddProduct.vue')
    },
    {
      path: '/stockcontrol',
      component: () => import(/* webpackChunkName: "about" */ './views/StockControl.vue')
    },
    {
      path: '/addstock',
      component: () => import(/* webpackChunkName: "about" */ './views/AddStock.vue')
    },
  ]
})
