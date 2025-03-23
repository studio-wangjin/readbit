'use client';

import { FullPageCentered } from '@/src/shared/ui/layout';

export function VerifyPage() {
  return (
    <main>
      <FullPageCentered>
        <section>
          <header>
            <h1>✉️ Please Check Your Email</h1>
          </header>

          <article>
            <p>
              We have sent a verification link to your email to complete your registration. Please
              check your inbox and click the link to verify your account.
            </p>
            <p>
              If you haven&apos;t received the email, please check your spam folder or try again
              later.
            </p>
          </article>

          <footer>
            <a href="/auth/sign-in">Return to Login Page</a>
          </footer>
        </section>
      </FullPageCentered>
    </main>
  );
}
