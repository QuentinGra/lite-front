import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const routes: Array<RouteRecordRaw> = [
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
        path: 'categorie/:id/modifier',
        name: 'AdminCategoryEdit',
        component: () => import('@/views/admin/category/AdminCategoryEditView.vue')
      },
      {
        path: 'categorie/creer',
        name: 'AdminCategoryCreate',
        component: () => import('@/views/admin/category/AdminCategoryCreateView.vue')
      },
      {
        path: 'editions',
        name: 'AdminEdition',
        component: () => import('@/views/admin/edition/AdminEditionView.vue')
      },
      {
        path: 'edition/:id/modifier',
        name: 'AdminEditionEdit',
        component: () => import('@/views/admin/edition/AdminEditionEditView.vue')
      },
      {
        path: 'edition/creer',
        name: 'AdminEditionCreate',
        component: () => import('@/views/admin/edition/AdminEditionCreateView.vue')
      },
      {
        path: 'variants',
        name: 'AdminVariant',
        component: () => import('@/views/admin/variant/AdminVariantView.vue')
      },
      {
        path: 'variant/:id/modifier',
        name: 'AdminVariantEdit',
        component: () => import('@/views/admin/variant/AdminVariantEditView.vue')
      },
      {
        path: 'variant/creer',
        name: 'AdminVariantCreate',
        component: () => import('@/views/admin/variant/AdminVariantCreateView.vue')
      },
      {
        path: 'auteurs',
        name: 'AdminAuthor',
        component: () => import('@/views/admin/author/AdminAuthorView.vue')
      },
      {
        path: 'auteur/:id/modifier',
        name: 'AdminAuthorEdit',
        component: () => import('@/views/admin/author/AdminAuthorEditView.vue')
      },
      {
        path: 'auteur/creer',
        name: 'AdminAuthorCreate',
        component: () => import('@/views/admin/author/AdminAuthorCreateView.vue')
      },
      {
        path: 'utilisateurs',
        name: 'AdminUser',
        component: () => import('@/views/admin/user/AdminUserView.vue')
      },
      {
        path: 'utilisateur/:id/modifier',
        name: 'AdminUserEdit',
        component: () => import('@/views/admin/user/AdminUserEditView.vue')
      },
      {
        path: 'livre/creer',
        name: 'AdminBookCreate',
        component: () => import('@/views/admin/book/AdminBookCreateView.vue')
      },
      {
        path: 'livres',
        name: 'AdminBook',
        component: () => import('@/views/admin/book/AdminBookView.vue')
      },
      {
        path: 'livre/:id/images',
        name: 'AdminBookImages',
        component: () => import('@/views/admin/book/AdminBookImagesView.vue')
      },
      {
        path: 'livre/:id/images/creer',
        name: 'AdminBookImageCreate',
        component: () => import('@/views/admin/book/AdminBookImageCreateView.vue')
      },
      {
        path: 'livre/:id/modifier',
        name: 'AdminBookEdit',
        component: () => import('@/views/admin/book/AdminBookEditView.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/NotFoundView.vue')
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
