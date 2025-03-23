'use client';

import { AuthForm } from '@/src/features/auth';
import { FullPageCentered } from '@/src/shared/ui/layout';

export function SignInPage() {
  return (
    <main>
      <FullPageCentered>
        <h1>Sign in to Readbit</h1>
        <AuthForm view="sign-in" />
      </FullPageCentered>
    </main>
  );
}
