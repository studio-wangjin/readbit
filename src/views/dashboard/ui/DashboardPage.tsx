import { UserInfo } from '@/src/features/auth/ui/UserInfo';
import { requireAuth } from '@/src/shared/lib/auth';
import { Button } from '@/src/shared/ui/button';
import { FullPageCentered } from '@/src/shared/ui/layout';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <main>
      <FullPageCentered>
        <h1>Dashboard</h1>

        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <UserInfo user={user} />

        <div className="flex flex-col gap-4 my-8">
          <Link href="/articles/my">
            <Button variant="secondary" className="w-full">
              My Articles
            </Button>
          </Link>
          <Link href="/articles/create">
            <Button className="w-full">Create Article</Button>
          </Link>
        </div>
      </FullPageCentered>
    </main>
  );
}
