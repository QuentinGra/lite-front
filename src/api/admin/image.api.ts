import type { Image, ImageCreate } from '@/interfaces/admin/image.interface'
import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/book-image`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const fetchImagesByBookId = async (bookId: number): Promise<Image[]> => {
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const createImage = async (image: ImageCreate): Promise<Image> => {
  const formData = new FormData()
  formData.append('image', image.image!)
  formData.append('book', image.book.toString())
  formData.append('enable', image.enable.toString())

  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })

  return handleResponse(response)
}

export const deleteImageById = async (id: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return true
}
