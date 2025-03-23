'use client'

import { AuthForm } from '@/src/features/auth'

export function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Readbit에 가입하세요</h1>
        <p className="text-gray-600 mt-2">
          복잡한 글을 쉽게 이해하고 매일 성장하는 여정을 시작하세요.
        </p>
      </div>
      
      <AuthForm view="sign-up" />
    </div>
  )
} 