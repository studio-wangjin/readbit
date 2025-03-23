import { z } from 'zod'

/**
 * 인증 폼 스키마
 */
export const authFormSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
})

export type AuthFormValues = z.infer<typeof authFormSchema> 