import { createClient } from '@/src/shared/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '@/src/domains/auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            로그아웃
          </button>
        </form>
      </div>
      <div>
        <p>환영합니다, {user.email}님!</p>
      </div>
    </div>
  );
}
