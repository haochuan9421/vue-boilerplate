// 全局过滤器
import Vue from 'vue';
import formatDate from '@/utils/formatDate';
// 时间戳转日期
Vue.filter('time', formatDate);
