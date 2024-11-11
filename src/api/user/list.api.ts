import type { FetchError } from '@/interfaces/error/error.interface'

const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/list`

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: FetchError = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

export const createList = async (name: string): Promise<any> => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  })

  return handleResponse(response)
}

export const fetchList = async (): Promise<any> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const fetchListById = async (id: number): Promise<any> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return handleResponse(response)
}

export const updateList = async (id: number, name: string): Promise<any> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name })
  })

  return handleResponse(response)
}

export const deleteList = async (id: number): Promise<boolean> => {
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
