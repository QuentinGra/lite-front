import { z } from 'zod'

export const createListSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères')
    .trim()
})

export type CreateListInput = z.infer<typeof createListSchema>
