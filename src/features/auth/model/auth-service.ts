import { authFormSchema } from './schema'
import type { AuthFormValues } from './schema'
import {
  signInWithPassword as apiSignInWithPassword,
  signUp as apiSignUp,
  signInWithGoogle as apiSignInWithGoogle
} from '../api/auth-api'

export { authFormSchema }
export type { AuthFormValues }

/**
 * 이메일/비밀번호로 로그인
 * 비즈니스 로직이 필요할 경우 여기에 추가
 */
export async function signInWithPassword(data: AuthFormValues) {
  // 추가적인 비즈니스 로직 처리 (로깅, 인증 전/후 처리 등)
  return apiSignInWithPassword(data)
}

/**
 * 이메일/비밀번호로 회원가입
 * 비즈니스 로직이 필요할 경우 여기에 추가
 */
export async function signUp(data: AuthFormValues) {
  // 추가적인 비즈니스 로직 처리 (사용자 데이터 준비, 회원가입 전/후 처리 등)
  return apiSignUp(data)
}

/**
 * Google OAuth로 로그인/회원가입
 * 비즈니스 로직이 필요할 경우 여기에 추가
 */
export async function signInWithGoogle() {
  // 추가적인 비즈니스 로직 처리
  return apiSignInWithGoogle()
} 