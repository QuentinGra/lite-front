import { z } from 'zod'

const validTypes = ['image/jpeg', 'image/png', 'image/webp']
const imageFileSchema = z.any().refine((file) => !validTypes.includes(file?.type), {
  message: 'Le fichier doit être une image de type JPEG, PNG ou WebP'
})

export const imageSchema = z.object({
  image: imageFileSchema,
  enable: z.boolean()
})
