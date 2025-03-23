import { UserInfo } from '@/src/features/auth/ui/UserInfo'
import { LogoutButton } from '@/src/features/auth/ui/LogoutButton'
import { requireAuth } from '@/src/shared/lib/auth'

export default async function DashboardPage() {
  const user = await requireAuth()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">대시보드</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
          <UserInfo user={user} />
        </div>
        
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
} 