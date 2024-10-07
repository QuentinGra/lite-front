import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/interfaces/auth/user.interface'
import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/me`

export const fetchUserInfo = async (): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }

  const data: User = await response.json()
  useAuthStore().setUser(data)
  return data
}
