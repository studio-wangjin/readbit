import { createClient } from '@/src/shared/api/supabase/server'
import { redirect } from 'next/navigation'

/**
 * 현재 로그인된 사용자 정보를 가져옵니다.
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

/**
 * 로그인이 필요한 페이지에서 사용자가 로그인되어 있는지 확인합니다.
 * 로그인되어 있지 않으면 로그인 페이지로 리디렉션합니다.
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return user
}

/**
 * 특정 역할을 가진 사용자만 접근 가능하도록 합니다.
 */
export async function requireRole(allowedRoles: string[]) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data.user) {
    redirect('/auth/login')
  }
  
  // 사용자의 역할 확인 (Supabase JWT에서 역할 정보 가져옴)
  const roles = (data.user.app_metadata.roles || []) as string[]
  const hasAllowedRole = roles.some(role => allowedRoles.includes(role))
  
  if (!hasAllowedRole) {
    // 권한이 없는 경우 접근 거부 페이지로 리디렉션
    redirect('/unauthorized')
  }
  
  return data.user
} 