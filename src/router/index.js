import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/forgotpassword',
      name: 'forgot password',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
    {
      path: '/inflow',
      name: 'inflow',
      component: () => import('../views/InflowView.vue'),
    },
    {
      path: '/outflow',
      name: 'outflow',
      component: () => import('../views/OutflowView.vue'),
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/TransferView.vue'),
    },
  ],
});

export default router;
