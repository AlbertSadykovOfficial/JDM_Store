import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Resgistration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Orders from '@/components/User/Orders'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      // exporting an id to component (trough the prop in the component)
      props: true,
      name: 'ad',
      component: Ad
    },
        {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard // protection
    },
    {
      path: '/newad',
      name: 'newad',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/registration',
      name: 'registration',
      component: Resgistration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      component: Home
    }
  ],
  mode: 'history'
})
