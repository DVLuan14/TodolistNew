import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Home from '../views/Home/Index.vue';
import userServices from '../lib/userServices';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      meta: {
        auth: false,
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const isSignedIn = userServices.isSignedIn();
  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (!isSignedIn) {
        router.push({ name: 'Login' });
      } else {
        next();
      }
    } else if (!isSignedIn) {
      next();
    } else {
      router.push({ name: 'Main' });
    }
  } else {
    next();
  }
});
export default router;
