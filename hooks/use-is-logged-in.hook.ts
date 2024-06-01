import { IUser } from '@/app/(models)/User';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();
  const pathname = usePathname();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth-check');
        setIsLoggedIn(true);
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [pathname]);

  return { isLoggedIn };
};
