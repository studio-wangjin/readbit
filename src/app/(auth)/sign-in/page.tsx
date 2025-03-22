import { AuthForm } from '@/src/features/auth/ui/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
  description: '계정에 로그인하세요.',
}

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <AuthForm view="sign-in" />
      </div>
    </div>
  )
} 