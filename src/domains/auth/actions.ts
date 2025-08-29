'use server';

import { createClient } from '@/src/shared/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error('로그아웃 중 오류가 발생했습니다');
  }
  
  redirect('/auth');
}