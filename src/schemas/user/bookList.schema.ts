import { z } from 'zod'

const STATUS_OPTIONS = {
  reading: 'En cours de lecture',
  read: 'Lu',
  wish: 'À lire'
} as const

export const addBookToListSchema = z.object({
  listId: z
    .number({
      required_error: 'Veuillez sélectionner une liste',
      invalid_type_error: 'La liste sélectionnée est invalide'
    })
    .positive('La liste sélectionnée est invalide'),

  status: z.enum(['reading', 'read', 'wish'] as const, {
    required_error: 'Veuillez sélectionner un statut',
    invalid_type_error: 'Le statut sélectionné est invalide'
  })
})

export type AddBookToListInput = z.infer<typeof addBookToListSchema>
