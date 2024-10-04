import { z } from 'zod'

export const authorSchema = z.object({
  firstName: z.string().min(1, "Le prénom de l'auteur est obligatoire"),
  lastName: z.string().min(1, "Le nom de famille de l'auteur est obligatoire"),
  description: z.string().optional(),
  enable: z.boolean(),
  image: z.any()
})
