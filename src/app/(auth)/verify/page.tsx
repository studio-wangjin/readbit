import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '이메일 인증',
  description: '이메일을 확인하여 계정 등록을 완료하세요.',
}

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">이메일을 확인해주세요</h1>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="mb-4">
            가입을 완료하기 위한 인증 링크를 이메일로 보냈습니다.
            이메일을 확인하고 링크를 클릭하여 가입을 완료해주세요.
          </p>
          
          <p className="text-sm text-gray-500 mb-6">
            이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
          </p>
          
          <Link 
            href="/auth/sign-in"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-center"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
} 