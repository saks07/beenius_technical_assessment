import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueBreadcrumbs from 'vue-2-breadcrumbs'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faUsers, faImages, faCamera, faBars, faCircle, faEllipsisH, faBreadSlice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faTimes, faUsers, faImages, faCamera, faBars, faCircle, faEllipsisH, faBreadSlice)

Vue.use(VueBreadcrumbs);
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
