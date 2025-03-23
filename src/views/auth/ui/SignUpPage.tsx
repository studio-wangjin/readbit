'use client';

import { AuthForm } from '@/src/features/auth';
import { FullPageCentered } from '@/src/shared/ui/layout';

export function SignUpPage() {
  return (
    <main>
      <FullPageCentered>
        <h1>Sign up to Readbit</h1>
        <AuthForm view="sign-up" />
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/auth/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </FullPageCentered>
    </main>
  );
}
