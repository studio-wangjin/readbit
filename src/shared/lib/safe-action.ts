import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

/**
 * 타입 안전한 서버 액션을 위한 유틸리티
 */
export const action = createSafeActionClient()

/**
 * 액션 결과 타입
 */
export type ActionResponse<T = void, E = Record<string, string[]>> = {
  data?: T
  error?: E
}

/**
 * Zod 스키마로 서버 액션 생성하기
 */
export function createActionWithSchema<T extends z.ZodType<any, any>>(
  schema: T,
  handler: (input: z.infer<T>) => Promise<ActionResponse<any>>
) {
  return action({
    schema,
    handler: async (data) => {
      try {
        return await handler(data)
      } catch (error) {
        return {
          error: {
            _form: ['서버 오류가 발생했습니다. 다시 시도해 주세요.'],
          },
        }
      }
    }
  })
} 