import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/logout`

interface LogoutResponse {
  status: string
  message: string
}

export const logoutUser = async (): Promise<LogoutResponse> => {
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

  const data: LogoutResponse = await response.json()
  return data
}
