import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import api from '@/api';

import '@/filters'; // 全局过滤器
import '@/directives'; // 全局指令
import '@/styles/index.scss';

import Message from 'base/message';
Vue.use(Message);

Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root');
