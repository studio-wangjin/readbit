'use client';

import { AuthForm } from '@/src/features/auth';
import { FullPageCentered } from '@/src/shared/ui/layout';

export function SignInPage() {
  return (
    <main>
      <FullPageCentered>
        <h1>Sign in to Readbit</h1>
        <AuthForm view="sign-in" />
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{' '}
          <a href="/auth/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </FullPageCentered>
    </main>
  );
}
