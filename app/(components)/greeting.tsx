'use client';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in.hook';

const Greeting = () => {
  // const { user } = useIsLoggedIn();

  // if (!user) {
  //   return null;
  // }
  return (
    <div className="flex items-center">
      {/* <p className="text-jet-500">Hello, {user.email}</p> */}
    </div>
  );
};
export default Greeting;
