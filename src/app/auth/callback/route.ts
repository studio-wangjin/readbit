import { createServerSupabaseClient } from '@/src/shared/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 인증 후 리디렉션할 경로
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
