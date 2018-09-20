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
import 'url-search-params-polyfill';
Es6Promise.polyfill()
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(iView);
//允许请求的时候带上cookie
axios.defaults.withCredentials = true;
const router = new VueRouter({
   routes:routes,
   mode:'history'
});
//判断登录是否过期
axios.interceptors.response.use((response) => {
  if (response.data === "") {
        alert("登录状态已过期")
        store.commit("changeLogin")
        return response
  } else {
        return response
  }
}, (error) => {
  return Promise.reject(error)
})
export const eventBus = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
