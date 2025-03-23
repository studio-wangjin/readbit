import { DashboardPage } from '@/src/pages/dashboard'
import { getCurrentUser } from '@/src/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }

  return <DashboardPage />
} 