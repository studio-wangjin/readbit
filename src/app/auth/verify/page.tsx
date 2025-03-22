import Link from 'next/link'

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">이메일을 확인해주세요</h1>
        
        <div className="mb-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        
        <p className="text-gray-600 text-center mb-6">
          회원가입을 완료하기 위해 이메일로 전송된 인증 링크를 클릭해주세요.
          이메일이 도착하기까지 몇 분 정도 소요될 수 있습니다.
        </p>
        
        <div className="text-center">
          <Link 
            href="/auth/sign-in"
            className="text-blue-600 hover:underline"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
} 