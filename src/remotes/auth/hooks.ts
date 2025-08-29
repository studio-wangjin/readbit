import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createClient } from '@/src/shared/lib/supabase/client';
import { authQueries } from './queries';

export function useUser() {
  const queryClient = useQueryClient();
  const query = useQuery(authQueries.user());
  
  // Auth 상태 변경 감지
  useEffect(() => {
    const supabase = createClient();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // 로그인 시 유저 정보 새로고침
        queryClient.invalidateQueries({ queryKey: authQueries.user().queryKey });
      } else {
        // 로그아웃 시 쿼리 데이터 제거
        queryClient.setQueryData(authQueries.user().queryKey, undefined);
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return { 
    user: query.data ?? null, 
    loading: query.isLoading,
    isLoading: query.isLoading,
    error: query.error,
  };
}