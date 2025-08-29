import { queryOptions } from '@tanstack/react-query';
import { authApi } from './apis';

export const authQueries = {
  user: () => 
    queryOptions({
      queryKey: ['auth', 'user'] as const,
      queryFn: authApi.getUser,
      staleTime: 1000 * 60 * 5, // 5분간 fresh
      gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
      retry: 1,
    }),
  
  // 향후 다른 auth 관련 쿼리들을 추가할 수 있음
  // profile: (userId: string) => 
  //   queryOptions({
  //     queryKey: ['auth', 'profile', userId] as const,
  //     queryFn: () => authApi.getProfile(userId),
  //   }),
};