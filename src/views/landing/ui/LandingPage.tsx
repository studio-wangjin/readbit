'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Readbit</h1>
          <div className="flex gap-4">
            <Link href="/auth/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">Simplify articles, amplify reading</h2>
            <p className="text-xl mb-10 text-gray-600">
              Turn complex content into bite-sized learning for daily growth
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg">Get Started for Free</Button>
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h3 className="text-2xl font-bold mb-10 text-center">Why Readbit?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Track Progress"
                description="Set reading goals and track your progress. Never lose your place in a book again."
              />
              <FeatureCard
                title="Discover Books"
                description="Get personalized recommendations based on your reading history and preferences."
              />
              <FeatureCard
                title="Build Community"
                description="Connect with fellow readers, share reviews, and join reading challenges."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Readbit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
