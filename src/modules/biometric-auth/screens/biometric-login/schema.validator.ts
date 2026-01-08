import * as z from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(5, 'Email is required')
    .email('Please, type a valid email'),
  password: z
    .string()
    .min(8, 'Password is required')
    .regex(/[0-9]/, "Your password must have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Your password must have at least one special caracter")
    .regex(/[a-z]/, "Your password must have at least one lowercase letter")
    .regex(/[A-Z]/, "Your password must have at least one uppercase letter")
})

export type LoginFormData = z.infer<typeof signInSchema>;