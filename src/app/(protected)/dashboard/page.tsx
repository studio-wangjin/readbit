import { Metadata } from 'next'
import { requireAuth } from '@/src/shared/lib/auth'
import { UserInfo } from '@/src/features/auth/ui/UserInfo'

export const metadata: Metadata = {
  title: '대시보드',
  description: '사용자 대시보드',
}

export default async function DashboardPage() {
  const user = await requireAuth()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-center">대시보드</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserInfo user={user} />
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">환영합니다!</h2>
            <p>
              Supabase 인증이 성공적으로 구현되었습니다.
              이 페이지는 인증된 사용자만 접근할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 