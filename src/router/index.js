// 路由配置
import Vue from 'vue';
import Router from 'vue-router';

import NotFound from 'views/404'; // 404提示页
import Home from 'views/Home.vue'; // 首页
const About = () => import( /* webpackChunkName: "about" */ 'views/About.vue'); // 关于页

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: NotFound,
      meta: { title: '404' }
    },
    {
      path: '/',
      component: Home,
      meta: { title: '首页' }
    },
    {
      path: '/about',
      component: About,
      meta: { title: '关于' }
    }
  ]
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
