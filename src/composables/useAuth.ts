import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { setCookie, getCookie, deleteCookie } from '@/utils/cookie.utils'
import { fetchUserInfo } from '@/api/auth/user.api'
import { loginUser } from '@/api/auth/login.api'
import { logoutUser } from '@/api/auth/logout.api'
import type { userInterface } from '@/interfaces/auth/user.interface'

// TODO: Trouver une solution pour ne pas avoir à créer un cookie LOGIN

/**
 * A composable function to handle user authentication.
 *
 * @returns {Object} An object containing:
 * - `isUserDefined` {ComputedRef<boolean>}: A computed reference indicating if the user is defined.
 * - `checkAuth` {Function}: An asynchronous function to check and fetch user information based on a bearer token.
 * - `logout` {Function}: A function to clear user information and delete the bearer token cookie.
 * - `login` {Function}: An asynchronous function to log in the user and store its information.
 * - `hasRole` {Function}: A function to check if the user has a specific role.
 */
export function useAuth(): {
  isUserDefined: ComputedRef<boolean>
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  hasRole: (role: string) => boolean
} {
  const authStore = useAuthStore()
  const router = useRouter()
  const isUserDefined = computed(() => authStore.isUserDefined)

  const checkAuth = async (): Promise<void> => {
    const login = getCookie('LOGIN')

    if (login) {
      try {
        await fetchUserInfo()
      } catch (error) {
        authStore.clearUser()
        throw new Error('Failed to fetch user info')
      }
    } else {
      authStore.clearUser()
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await logoutUser()
      deleteCookie('LOGIN')
      authStore.clearUser()
      router.push('/')
    } catch (error) {
      throw new Error('Logout failed')
    }
  }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const data: userInterface = await loginUser(username, password)
      authStore.setUser(data)
      setCookie('LOGIN', 'true', 14400)
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const hasRole = (role: string): boolean => {
    return authStore.user?.roles.includes(role) || false
  }

  return {
    isUserDefined,
    checkAuth,
    logout,
    login,
    hasRole
  }
}
