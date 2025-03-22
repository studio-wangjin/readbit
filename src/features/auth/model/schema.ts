import { z } from 'zod'
import { emailSchema, passwordSchema } from '@/src/shared/lib/zod-utils'

/**
 * 로그인 폼 스키마
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginFormSchema> 