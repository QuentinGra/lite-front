import type { Book, BookCreate } from '@/interfaces/admin/book.interface'
import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/book`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const fetchLatestBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const createBook = async (book: BookCreate): Promise<Book> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(book)
  })

  return handleResponse(response)
}

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(book)
  })

  return handleResponse(response)
}

export const deleteBookById = async (id: number): Promise<boolean> => {
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
