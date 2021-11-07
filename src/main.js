import Vue from 'vue'
import App from './App'
import store from './store'
import * as fb from 'firebase/app'
import router from './router'

import { onAuthStateChanged, getAuth} from 'firebase/auth'
import { default as initObject } from './initialization' 

// Global Component for Buy
import BuyModalComponent from "@/components/Common/BuyModal"
Vue.component('app-buy-modal', BuyModalComponent)
//import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    console.log(initObject)
    fb.initializeApp(initObject)

    // Downloading an ads from firebase
    this.$store.dispatch('fetchAds')

    // session:
    // firebase will grab auth info from localStorage
    const auth = getAuth()
    auth.onAuthStateChanged(user => {
        console.log('main.js => onAuthStateChanged')
        console.log(user)
        if (user) {
          this.$store.dispatch('autoLoginUser', user) // user->action
        }
    })
    
  }
})
