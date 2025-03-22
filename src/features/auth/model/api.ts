import { type LoginFormValues } from './schema'

/**
 * TanStack Query를 위한 로그인 Fetch 함수
 */
export async function loginUser(credentials: LoginFormValues) {
  // 실제 구현에서는 fetch API나 Supabase 클라이언트 등을 사용
  return new Promise<{ id: string; name: string }>((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'test@example.com' && credentials.password === 'Test1234!') {
        resolve({ 
          id: '1', 
          name: '테스트 사용자' 
        })
      } else {
        reject(new Error('이메일 또는 비밀번호가 일치하지 않습니다.'))
      }
    }, 1000)
  })
} 