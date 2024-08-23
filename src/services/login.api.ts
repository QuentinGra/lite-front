import { useAuthStore } from '@/stores/authStore'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/login`

export const login = async (username: string, password: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data = await response.json()
  useAuthStore().setUser(data)
  return data
}
