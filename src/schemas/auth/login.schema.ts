import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Mot de passe invalide' })
})
