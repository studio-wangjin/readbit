'use client'

export function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-2xl font-bold mt-4">이메일을 확인해 주세요</h1>
        </div>
        
        <div className="text-gray-600 mb-6">
          <p className="mb-4">
            회원가입을 완료하기 위한 인증 링크를 이메일로 보내드렸습니다.
            메일함을 확인하고 링크를 클릭하여 계정 인증을 완료해 주세요.
          </p>
          <p>
            이메일이 도착하지 않았다면 스팸 폴더를 확인하거나 잠시 후 다시 시도해 주세요.
          </p>
        </div>
        
        <div className="mt-6">
          <a
            href="/auth/sign-in"
            className="block text-center w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            로그인 페이지로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
} 