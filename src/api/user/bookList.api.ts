import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/list/book/add`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const addBookToList = async (
  book: number,
  readingList: number,
  status: string
): Promise<any> => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ book, readingList, status })
  })

  return handleResponse(response)
}
