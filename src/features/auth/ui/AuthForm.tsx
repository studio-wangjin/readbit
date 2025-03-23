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
import { Button } from '@/src/shared/ui/button';
import { Divider } from '@/src/shared/ui/divider';

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
      console.error('Authentication error:', error);
      setServerError(
        error instanceof Error ? error.message : 'An error occurred during authentication'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setServerError(null);

    try {
      await signInWithGoogle();
      // OAuth redirects, so no additional work needed here
    } catch (error) {
      console.error('Google sign-in error:', error);
      setServerError(
        error instanceof Error ? error.message : 'An error occurred during Google sign-in'
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} loading={isLoading} className="w-full mt-4">
          {view === 'sign-in' ? 'Sign in' : 'Sign up'}
        </Button>

        <Divider>or</Divider>

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
