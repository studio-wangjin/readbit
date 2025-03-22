import { AuthForm } from '@/src/features/auth/ui/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회원가입',
  description: '새 계정을 생성하세요.',
}

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <AuthForm view="sign-up" />
      </div>
    </div>
  )
} 