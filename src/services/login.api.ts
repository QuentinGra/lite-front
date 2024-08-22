import { useAuthStore } from '@/stores/authStore'

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL_LOCAL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'An error occurred while logging in')
    }

    const data = await response.json()
    useAuthStore().setUser(data)
    return data
  } catch (error) {
    console.error('An error occurred while logging in:', error)
    throw error
  }
}
