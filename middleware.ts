import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/src/shared/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // 보호된 라우트 목록
  // TODO: dashboard 비로그인 유저도 접근 가능하고 카드 읽을수있게 하고, streak이나 add article 누르면 로그인 유도
  const protectedPaths = ['/dashboard', '/cards'];

  // 현재 경로가 보호된 라우트인지 확인
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Supabase 세션 업데이트 및 사용자 정보 가져오기
  const { response, user } = await updateSession(request);

  if (isProtectedPath && !user) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/cards/:path*'],
};
