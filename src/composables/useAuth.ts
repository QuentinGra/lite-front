import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { getCookie, deleteCookie, setCookie } from '@/utils/cookie.utils'
import { fetchUserInfo } from '@/api/user.api'
import { loginUser } from '@/api/login.api'
import type { userInterface } from '@/interfaces/user.interface'

/**
 * A composable function to handle user authentication.
 *
 * @returns {Object} An object containing:
 * - `isUserDefined` {ComputedRef<boolean>}: A computed reference indicating if the user is defined.
 * - `checkAuth` {Function}: An asynchronous function to check and fetch user information based on a bearer token.
 * - `logout` {Function}: A function to clear user information and delete the bearer token cookie.
 * - `login` {Function}: An asynchronous function to log in the user and store its information.
 */
export function useAuth(): {
  isUserDefined: ComputedRef<boolean>
  checkAuth: () => Promise<void>
  logout: () => void
  login: (username: string, password: string) => Promise<void>
} {
  const authStore = useAuthStore()
  const isUserDefined = computed(() => authStore.isUserDefined)

  const checkAuth = async (): Promise<void> => {
    const userId = getCookie('USER')

    if (userId) {
      try {
        await fetchUserInfo(userId)
      } catch (error) {
        authStore.clearUser()
        throw new Error('Failed to fetch user info')
      }
    } else {
      authStore.clearUser()
    }
  }

  const logout = (): void => {
    authStore.clearUser()
    deleteCookie('USER')
  }

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const data: userInterface = await loginUser(username, password)
      authStore.setUser(data)
      setCookie('USER', data.id.toString(), 1)
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  return {
    isUserDefined,
    checkAuth,
    logout,
    login
  }
}
