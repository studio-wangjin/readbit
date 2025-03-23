'use client';

import { AuthForm } from '@/src/features/auth';

export function SignInPage() {
  return (
    <main>
      <h1>Sign in to Readbit</h1>
      <AuthForm view="sign-in" />
    </main>
  );
}
