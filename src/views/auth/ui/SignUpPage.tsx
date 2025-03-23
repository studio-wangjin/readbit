'use client';

import { AuthForm } from '@/src/features/auth';

export function SignUpPage() {
  return (
    <main>
      <h1>Sign up to Readbit</h1>
      <AuthForm view="sign-up" />
    </main>
  );
}
