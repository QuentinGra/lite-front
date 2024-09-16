import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { getCookie, deleteCookie } from '@/utils/cookie.utils'
import { fetchUserInfo } from '@/api/user.api'

/**
 * Custom hook for handling authentication logic.
 *
 * @returns {Object} An object containing:
 * - `isUserDefined` {ComputedRef<boolean>}: A computed reference indicating if the user is defined.
 * - `checkAuth` {Function}: An asynchronous function to check and fetch user information based on a bearer token.
 * - `logout` {Function}: A function to clear user information and delete the bearer token cookie.
 */
export function useAuth() {
  const authStore = useAuthStore()
  const isUserDefined = computed(() => authStore.isUserDefined)

  const checkAuth = async () => {
    const bearerToken = getCookie('bearer')
    if (bearerToken) {
      try {
        await fetchUserInfo(bearerToken)
      } catch (error) {
        authStore.clearUser()
      }
    } else {
      authStore.clearUser()
    }
  }

  const logout = () => {
    authStore.clearUser()
    deleteCookie('bearer')
  }

  return {
    isUserDefined,
    checkAuth,
    logout
  }
}
