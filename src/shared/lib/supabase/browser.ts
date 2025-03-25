import { createBrowserClient } from '@supabase/ssr';
import { type Database } from '@/src/shared/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * 브라우저 환경에서 사용할 Supabase 클라이언트
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

/**
 * 기본 Supabase 클라이언트
 */
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
