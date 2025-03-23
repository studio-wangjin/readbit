import { UserInfo } from '@/src/features/auth/ui/UserInfo';
import { LogoutButton } from '@/src/features/auth/ui/LogoutButton';
import { requireAuth } from '@/src/shared/lib/auth';
import { FullPageCentered } from '@/src/shared/ui/layout';

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <main>
      <FullPageCentered>
        <h1>Dashboard</h1>

        <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
        <UserInfo user={user} />

        <LogoutButton />
      </FullPageCentered>
    </main>
  );
}
