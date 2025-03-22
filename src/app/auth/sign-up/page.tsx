import { AuthForm } from '@/src/features/auth/ui/AuthForm'
import { getCurrentUser } from '@/src/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  // 이미 로그인된 사용자는 대시보드로 리디렉션
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">회원가입</h1>
      <AuthForm view="sign-up" />
    </div>
  )
} 