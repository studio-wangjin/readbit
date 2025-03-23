'use client'

import { AuthForm } from '@/src/features/auth'

export function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Readbit에 로그인</h1>
        <p className="text-gray-600 mt-2">
          계정에 로그인하고 학습을 이어가세요.
        </p>
      </div>
      
      <AuthForm view="sign-in" />
    </div>
  )
} 