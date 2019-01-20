// 全局指令
import Vue from 'vue';
import Touch from './touch';
import TransferDom from './transfer-dom';
Vue.directive('touch', Touch);
Vue.directive('transfer-dom', TransferDom);
