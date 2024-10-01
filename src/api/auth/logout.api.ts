const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/logout`

export const logoutUser = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data = await response.json()
  return data
}
