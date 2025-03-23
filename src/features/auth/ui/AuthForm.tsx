'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  authFormSchema,
  type AuthFormValues,
  signInWithPassword,
  signUp,
  signInWithGoogle,
} from '../model/auth-service';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { OAuthButton } from '@/src/shared/ui/OAuthButton';

type AuthFormProps = {
  view: 'sign-in' | 'sign-up';
};

export function AuthForm({ view }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    setServerError(null);

    try {
      if (view === 'sign-in') {
        await signInWithPassword(data);
        router.refresh();
        router.push('/dashboard');
      } else {
        await signUp(data);
        // 이메일 확인 페이지로 이동
        router.push('/auth/verify');
      }
    } catch (error) {
      console.error('인증 오류:', error);
      setServerError(error instanceof Error ? error.message : '인증 과정에서 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setServerError(null);

    try {
      await signInWithGoogle();
      // OAuth는 리디렉션되므로 여기서는 추가 작업 필요 없음
    } catch (error) {
      console.error('Google 로그인 오류:', error);
      setServerError(
        error instanceof Error ? error.message : 'Google 로그인 과정에서 오류가 발생했습니다'
      );
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{serverError}</div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isLoading}
                  placeholder="name@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-70 mt-4"
        >
          {isLoading
            ? view === 'sign-in'
              ? '로그인 중...'
              : '회원가입 중...'
            : view === 'sign-in'
              ? '로그인'
              : '회원가입'}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <OAuthButton
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          view={view}
          provider="google"
        />
      </form>
    </Form>
  );
}
