import { useAuthStore } from '@/stores/authStore'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user`

// TODO: Modify the fetch for getting user info from the server with the token

export const fetchUserInfo = async (token: string) => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data = await response.json()
  useAuthStore().setUser(data)
  return data
}
