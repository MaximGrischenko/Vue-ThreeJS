import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
});

for (const moduleName of Object.keys(modules)) {
  if(modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/INIT_MODULE`);
  }
}

export default store;
