import { z } from 'zod'

export const editionSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  enable: z.boolean()
})
