'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/shared/api/supabase/client'

interface LogoutButtonProps {
  children?: React.ReactNode
  className?: string
}

export function LogoutButton({ children, className }: LogoutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? '로그아웃 중...' : children || '로그아웃'}
    </button>
  )
} 