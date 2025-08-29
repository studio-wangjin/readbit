import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 보호된 라우트 목록
  const protectedPaths = ['/dashboard', '/cards'];

  // 현재 경로가 보호된 라우트인지 확인
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath) {
    // TODO: 실제 인증 체크 로직 구현
    // 현재는 임시로 주석 처리
    // const isAuthenticated = checkAuth(request);
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/auth', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/cards/:path*'],
};
