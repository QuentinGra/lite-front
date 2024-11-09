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
    path: '/livres',
    name: 'Books',
    component: () => import('@/views/public/book/BooksView.vue')
  },
  {
    path: '/livre/:id(\\d+)',
    name: 'BookDetail',
    component: () => import('@/views/public/book/BookDetailView.vue')
  },
  {
    path: '/categorie/:id(\\d+)',
    name: 'CategoryDetail',
    component: () => import('@/views/public/category/CategoryDetailView.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/public/category/CategoriesView.vue')
  },
  {
    path: '/auteur/:id(\\d+)',
    name: 'AuthorDetail',
    component: () => import('@/views/public/author/AuthorDetailView.vue')
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
    path: '/politique-confidentialite',
    name: 'PrivacyPolicy',
    component: () => import('@/views/public/legal/PrivacyPolicyView.vue')
  },
  {
    path: '/mentions-legales',
    name: 'LegalNotice',
    component: () => import('@/views/public/legal/LegalNoticeView.vue')
  },
  {
    path: '/politique-cookies',
    name: 'CookiesPolicy',
    component: () => import('@/views/public/legal/CookiesPolicyView.vue')
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
    path: '/profil',
    name: 'Profile',
    component: () => import('@/views/user/UserProfileView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'ProfileList',
        component: () => import('@/views/user/UserBookListView.vue')
      },
      {
        path: 'note',
        name: 'ProfileRate',
        component: () => import('@/views/user/UserBookRateView.vue')
      },
      {
        path: 'securite',
        name: 'ProfileSecurity',
        component: () => import('@/views/user/UserSecurityView.vue')
      },
      {
        path: 'suppression',
        name: 'ProfileDelete',
        component: () => import('@/views/user/UserDeleteView.vue')
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
router.beforeEach(async (to, _) => {
  const { isUserDefined, hasRole, checkAuth } = useAuth()

  // Check if the user is defined
  await checkAuth()

  if (to.meta.requiresAuth && !isUserDefined.value) {
    return { name: 'Login' }
  } else if (to.meta.requiresRole && !hasRole(to.meta.requiresRole as string)) {
    return { name: 'Home' }
  } else {
    return true
  }
})

export default router
