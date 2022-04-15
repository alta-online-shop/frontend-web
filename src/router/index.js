import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Auth.vue'),
    children: [
      {
        path: 'register',
        name: 'AuthRegister',
        component: () => import(/* webpackChunkName: "auth-register" */ '../views/auth/Register.vue')
      },
      {
        path: 'login',
        name: 'AuthLogin',
        component: () => import(/* webpackChunkName: "auth-login" */ '../views/auth/Login.vue')
      },
    ],
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
