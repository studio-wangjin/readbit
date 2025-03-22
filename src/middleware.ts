import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/src/shared/api/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // 인증이 필요한 경로들
  const protectedPaths = ['/dashboard']
  
  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  // 인증된 사용자가 로그인/회원가입 페이지에 접근하려는 경우
  if (session && (
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/sign-in') ||
    request.nextUrl.pathname.startsWith('/sign-up')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // 인증되지 않은 사용자가 보호된 경로에 접근하려는 경우
  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  
  return NextResponse.next()
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: [
    // 인증 라우트
    '/sign-in',
    '/sign-up',
    '/auth/:path*',
    // 보호된 라우트
    '/dashboard/:path*',
    // 인증 필요한 API 라우트
    '/api/protected/:path*',
  ],
} 