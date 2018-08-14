import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {store} from './store/index';
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
import 'url-search-params-polyfill'
Es6Promise.polyfill()

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
   routes:routes,
   mode:'history'
});

export const eventBus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
