import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/rating`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const createRating = async (book: number, user: number, rating: number): Promise<any> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ book, user, rating })
  })

  return handleResponse(response)
}

export const getRatingByBook = async (book: number): Promise<any> => {
  const response = await fetch(`${API_URL}/book/${book}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const updateRating = async (ratingId: number, rating: number): Promise<any> => {
  const response = await fetch(`${API_URL}/${ratingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ rating })
  })

  return handleResponse(response)
}
