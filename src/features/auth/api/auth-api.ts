import { createClient } from '@/src/shared/api/supabase/client'
import type { AuthFormValues } from '../model/schema'

/**
 * 이메일/비밀번호로 로그인
 */
export async function signInWithPassword(data: AuthFormValues) {
  const supabase = createClient()
  
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  
  if (result.error) {
    throw result.error
  }
  
  return result.data
}

/**
 * 이메일/비밀번호로 회원가입
 */
export async function signUp(data: AuthFormValues) {
  const supabase = createClient()
  
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  
  if (result.error) {
    throw result.error
  }
  
  return result.data
}

/**
 * Google OAuth로 로그인/회원가입
 */
export async function signInWithGoogle() {
  const supabase = createClient()
  
  const result = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  
  if (result.error) {
    throw result.error
  }
  
  return result
} 