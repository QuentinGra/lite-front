import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  enable: z.boolean()
})
