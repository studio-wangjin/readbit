import { User } from '@supabase/supabase-js';
import { LogoutButton } from './LogoutButton';
import { Card, CardHeader, CardContent, CardTitle } from '@/src/shared/ui/card';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>User Information</CardTitle>
          <LogoutButton variant="destructive" size="sm" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <UserInfoItem label="Email" value={user.email} />

          <UserInfoItem label="ID" value={user.id} valueClassName="text-sm font-mono" />

          <UserInfoItem
            label="Authentication Method"
            value={user.app_metadata.provider || 'Email/Password'}
          />

          <UserInfoItem
            label="Email Verification"
            value={user.email_confirmed_at ? 'Verified' : 'Not Verified'}
            valueClassName={user.email_confirmed_at ? 'text-green-600' : 'text-red-600'}
          />

          <UserInfoItem label="Joined" value={new Date(user.created_at).toLocaleDateString()} />
        </div>
      </CardContent>
    </Card>
  );
}

interface UserInfoItemProps {
  label: string;
  value: string | null | undefined;
  valueClassName?: string;
}

function UserInfoItem({ label, value, valueClassName }: UserInfoItemProps) {
  return (
    <div className="flex items-center">
      <span className="font-medium mr-2">{label}:</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
