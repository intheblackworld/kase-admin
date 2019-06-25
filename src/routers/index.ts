import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user/:personId',
      name: 'user',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/User.vue'),
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "create" */ '@/pages/Create.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ '@/pages/Login.vue'),
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "search" */ '@/pages/Search.vue'),
    },
  ],
})
