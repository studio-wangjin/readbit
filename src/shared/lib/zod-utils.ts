import { z } from 'zod'

/**
 * 공통 Zod 에러 메시지 형식으로 변환하는 함수
 */
export function formatZodError(error: z.ZodError) {
  return error.errors.reduce<Record<string, string>>(
    (acc, curr) => {
      const key = curr.path.join('.')
      if (key) {
        acc[key] = curr.message
      }
      return acc
    },
    {}
  )
}

/**
 * 기본 유효성 검사 스키마
 */
export const baseStringSchema = z.string().min(1, '필수 입력 항목입니다')

export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식이 아닙니다')

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[a-z]/, '비밀번호는 최소 하나의 소문자를 포함해야 합니다')
  .regex(/[A-Z]/, '비밀번호는 최소 하나의 대문자를 포함해야 합니다')
  .regex(/[0-9]/, '비밀번호는 최소 하나의 숫자를 포함해야 합니다')
  .regex(/[^a-zA-Z0-9]/, '비밀번호는 최소 하나의 특수문자를 포함해야 합니다') 