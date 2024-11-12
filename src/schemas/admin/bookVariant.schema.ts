import { z } from 'zod'

export const bookVariantSchema = z.object({
  type: z.enum(['broché', 'poche', 'relié', 'ebook'], {
    required_error: 'Le type est requis',
    invalid_type_error: 'Le type est invalide'
  }),
  enable: z.boolean()
})
