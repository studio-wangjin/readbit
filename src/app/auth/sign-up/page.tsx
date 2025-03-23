import { SignUpPage } from '@/src/pages/auth/sign-up'
import { getCurrentUser } from '@/src/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  // 이미 로그인한 사용자는 대시보드로 리디렉션
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }

  return <SignUpPage />
} 