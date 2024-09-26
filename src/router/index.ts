import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/connexion',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/inscription',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue')
  },
  {
    path: '/admin-panel',
    name: 'Dashboard',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
    children: [
      {
        path: 'categories',
        name: 'AdminCategory',
        component: () => import('@/views/admin/category/AdminCategoryView.vue')
      },
      {
        path: 'category/:id/edit',
        name: 'AdminCategoryEdit',
        component: () => import('@/views/admin/category/AdminCategoryEditView.vue'),
        props: true
      },
      {
        path: 'category/create',
        name: 'AdminCategoryCreate',
        component: () => import('@/views/admin/category/AdminCategoryCreateView.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for authentication and role verification
router.beforeEach(async (to, _, next) => {
  const { isUserDefined, hasRole, checkAuth } = useAuth()

  // Check if the user is defined
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
