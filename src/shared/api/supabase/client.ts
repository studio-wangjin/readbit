import { createBrowserClient } from '@supabase/ssr'
import { type Database } from '@/src/shared/types/supabase'

/**
 * 브라우저 환경에서 사용할 Supabase 클라이언트 생성
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
} 