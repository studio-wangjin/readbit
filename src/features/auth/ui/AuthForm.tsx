'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/src/shared/api/supabase/client'

const authFormSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
})

type AuthFormValues = z.infer<typeof authFormSchema>

type AuthFormProps = {
  view: 'sign-in' | 'sign-up'
}

export function AuthForm({ view }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true)
    setServerError(null)
    
    try {
      const supabase = createClient()
      
      if (view === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })
        
        if (error) throw error
        
        router.refresh()
        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        
        if (error) throw error
        
        // 이메일 확인 페이지로 이동
        router.push('/auth/verify')
      }
    } catch (error) {
      console.error('인증 오류:', error)
      setServerError(error instanceof Error ? error.message : '인증 과정에서 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {view === 'sign-in' ? '로그인' : '회원가입'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {serverError}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-70"
        >
          {isLoading
            ? view === 'sign-in' ? '로그인 중...' : '회원가입 중...'
            : view === 'sign-in' ? '로그인' : '회원가입'}
        </button>
        
        {view === 'sign-in' ? (
          <p className="text-center text-sm">
            계정이 없으신가요?{' '}
            <a href="/auth/sign-up" className="text-blue-600 hover:underline">
              회원가입
            </a>
          </p>
        ) : (
          <p className="text-center text-sm">
            이미 계정이 있으신가요?{' '}
            <a href="/auth/sign-in" className="text-blue-600 hover:underline">
              로그인
            </a>
          </p>
        )}
      </form>
    </div>
  )
} 