import { User } from '@supabase/supabase-js'
import { LogoutButton } from './LogoutButton'

interface UserInfoProps {
  user: User
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">사용자 정보</h2>
        <LogoutButton className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium">이메일:</span>
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium">ID:</span>
          <span className="text-sm font-mono">{user.id}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium">인증 방법:</span>
          <span>{user.app_metadata.provider || '이메일/비밀번호'}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium">이메일 인증:</span>
          <span className={user.email_confirmed_at ? 'text-green-600' : 'text-red-600'}>
            {user.email_confirmed_at ? '인증됨' : '인증되지 않음'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium">가입일:</span>
          <span>{new Date(user.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
} 