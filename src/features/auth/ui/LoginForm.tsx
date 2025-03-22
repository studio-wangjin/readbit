'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { loginFormSchema, type LoginFormValues } from '../model/schema'
import { loginUser } from '../model/api'

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('로그인 성공:', data)
      // 여기서 로그인 후 리다이렉트 등의 작업 수행
    },
    onError: (error: Error) => {
      setServerError(error.message)
    },
  })

  const onSubmit = handleSubmit((data) => {
    setServerError(null)
    loginMutation.mutate(data)
  })

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
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
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || loginMutation.isPending}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-70"
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </button>
        
        <div className="text-center text-sm">
          <p>
            테스트 계정: test@example.com / Test1234!
          </p>
        </div>
      </form>
    </div>
  )
} 