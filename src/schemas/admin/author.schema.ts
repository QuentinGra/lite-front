import { z } from 'zod'

const validTypes = ['image/jpeg', 'image/png', 'image/webp']

export const authorSchema = z.object({
  firstName: z.string().min(1, "Le prénom de l'auteur est obligatoire"),
  lastName: z.string().min(1, "Le nom de famille de l'auteur est obligatoire"),
  description: z.string().optional(),
  enable: z.boolean(),
  image: z.any().refine((file) => !validTypes.includes(file?.type), {
    message: 'Le fichier doit être une image de type JPEG, PNG ou WebP'
  })
})
