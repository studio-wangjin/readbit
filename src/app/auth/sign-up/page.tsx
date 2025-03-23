import { SignUpPage } from '@/src/pages/auth'
import { getCurrentUser } from '@/src/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }

  return <SignUpPage />
} 