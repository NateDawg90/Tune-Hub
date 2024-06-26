import Profile from '@/app/(components)/profile';
import { verifyAuth } from '@/lib/lucia';

export default async function Page() {
  const { user } = await verifyAuth();

  if (!user) {
    return null;
  }
  return (
    <div className="container mx-auto px-4">
      <Profile user={user} />
    </div>
  );
}
