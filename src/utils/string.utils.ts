/**
 * Capitalizes the first letter of a given string.
 *
 * @param string - The string to capitalize.
 * @returns The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
