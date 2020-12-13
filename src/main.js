import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import moment from 'moment'
//import VueGapi from 'vue-gapi'
import firebase from "firebase";

const config = {
  apiKey: 'GefDt5S8oEcOtaCOttX3lj7x',
  clientId: '49399957247-vl9600n5r5n76f601tqsbvjob5lg5dsi.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  discoveryDocs: []
}



//Vue.use(VueGapi, config)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueMoment, {
  moment,
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
