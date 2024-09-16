const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api/user/create`

export const register = async (
  email: string,
  password: string,
  firstName: string | null,
  lastName: string | null,
  birthDate: Date | null
) => {
  const body = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate
  }

  console.log(body)
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data = await response.json()
  return data
}
