/**
 * Retrieves the value of a specified cookie by its name.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie if found, otherwise `undefined`.
 */
export function getCookie(name: string): string | undefined {
  const cookie: string | undefined = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : undefined
}

/**
 * Sets a cookie with the specified name, value, and expiration time in seconds.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param seconds - The number of seconds until the cookie expires.
 */
export function setCookie(name: string, value: string, seconds: number): void {
  const date: Date = new Date()
  date.setTime(date.getTime() + seconds * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

/**
 * Deletes a cookie by setting its expiration date to a past date.
 *
 * @param name - The name of the cookie to delete.
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}
