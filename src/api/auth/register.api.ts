import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/create`

interface RegisterRequestBody {
  email: string
  password: string
  firstName: string | null
  lastName: string | null
  birthDate: Date | null
}

interface RegisterResponse {
  status: string
  message: string
}

export const register = async (
  email: string,
  password: string,
  firstName: string | null,
  lastName: string | null,
  birthDate: Date | null
): Promise<RegisterResponse> => {
  const body: RegisterRequestBody = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }

  const data: RegisterResponse = await response.json()
  return data
}
