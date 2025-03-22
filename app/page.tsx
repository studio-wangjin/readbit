import { LoginForm } from '@/src/features/auth/ui/LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Zod와 TanStack Query 예제</h1>
      
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <LoginForm />
      </div>
    </div>
  )
}
