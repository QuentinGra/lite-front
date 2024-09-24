import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

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
      path: '/admin-panel',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' }
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const { isUserDefined, hasRole, checkAuth } = useAuth()

  // Vérifiez l'authentification de l'utilisateur
  await checkAuth()

  if (to.meta.requiresAuth && !isUserDefined.value) {
    next({ name: 'Login' })
  } else if (to.meta.requiresRole && !hasRole(to.meta.requiresRole as string)) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
