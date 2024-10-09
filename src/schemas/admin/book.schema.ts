import { z } from 'zod'

export const bookSchema = z.object({
  name: z.string().min(1, 'Le titre du livre est requis'),
  description: z.string().optional(),
  dateEdition: z
    .string()
    .transform((str) => {
      const [year, month, day] = str.split('-').map(Number)
      return new Date(year, month - 1, day + 1)
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Date d'édition invalide"
    }),
  enable: z.boolean(),
  edition: z.number().int().positive("L'édition est requise"),
  author: z.number().int().positive("L'auteur est requis"),
  categories: z.array(z.number().int().positive('Les catégories sont requises')),
  bookVariants: z.array(z.number().int().positive('Les variants de livre sont requis'))
})

export type BookCreate = z.infer<typeof bookSchema>
