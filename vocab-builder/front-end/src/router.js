import Vue from 'vue';
import Router from 'vue-router';

import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Intro from './views/Intro.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/new',
      name: 'new-word',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  const publicPages = ['/login', '/register']; // các trang không cần login

  if (!token && !publicPages.includes(to.path)) {
    return next('/login'); // chưa login → redirect về login
  }

  if (token && to.path === '/login') {
    return next('/words'); // đã login rồi → đừng quay lại /login
  }

  next(); // cho đi tiếp
});


export default router;
