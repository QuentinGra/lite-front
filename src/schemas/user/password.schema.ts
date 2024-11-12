import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Mot de passe invalide' })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/, {
        message:
          'Votre mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial, et faire plus de 8 caractères.'
      }),
    confirmationPassword: z.string()
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmationPassword']
  })
