/**
 * Formats a given date into a string with the format "day month year" in French locale.
 *
 * @param dateString - The date to be formatted.
 * @returns The formatted date string in "day month year" format.
 */
export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
