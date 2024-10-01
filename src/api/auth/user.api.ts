import { useAuthStore } from '@/stores/authStore'
import type { userWithTimestampsInterface } from '@/interfaces/auth/user.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/me`

interface fetchError {
  message: string
}

export const fetchUserInfo = async (): Promise<userWithTimestampsInterface> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error: fetchError = await response.json()
    throw new Error(error.message)
  }

  const data: userWithTimestampsInterface = await response.json()
  useAuthStore().setUser(data)
  return data
}
