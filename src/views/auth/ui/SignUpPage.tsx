'use client';

import { AuthForm } from '@/src/features/auth';
import { FullPageCentered } from '@/src/shared/ui/layout';

export function SignUpPage() {
  return (
    <main>
      <FullPageCentered>
        <h1>Sign up to Readbit</h1>
        <AuthForm view="sign-up" />
      </FullPageCentered>
    </main>
  );
}
