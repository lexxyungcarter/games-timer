import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
