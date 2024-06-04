import Profile from '@/app/(components)/profile';
import { verifyAuth } from '@/lib/lucia';

export default async function Page() {
  const { user } = await verifyAuth();

  if (!user) {
    return null;
  }
  return <Profile userId={user.id} email={user.email} />;
}
