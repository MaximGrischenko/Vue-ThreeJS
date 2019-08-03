import Vue from 'vue';
import App from './layouts/App.vue';
import store from './vuex';

Vue.config.productionTip = false;

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
Vue.use(VueMaterial);

export const EventBus = new Vue();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
