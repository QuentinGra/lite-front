import type { Author } from '@/interfaces/admin/author.interface'
import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/author`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const fetchAuthors = async (): Promise<Author[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const fetchAuthorById = async (id: number): Promise<Author> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const createAuthor = async (author: Partial<Author>, image?: File): Promise<Author> => {
  const formData = new FormData()
  Object.keys(author).forEach((key) => {
    formData.append(key, (author as any)[key])
  })
  if (image) {
    formData.append('image', image)
  }

  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })

  return handleResponse(response)
}

export const updateAuthor = async (id: number, author: Partial<Author>): Promise<Author> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(author)
  })

  return handleResponse(response)
}

export const deleteAuthorById = async (id: number): Promise<boolean> => {
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
