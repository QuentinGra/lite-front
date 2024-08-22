import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/connexion',
      name: 'Login',
      component: () => import('@/components/auth/LoginForm.vue')
    },
    {
      path: '/inscription',
      name: 'Register',
      component: () => import('@/components/auth/RegisterForm.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
