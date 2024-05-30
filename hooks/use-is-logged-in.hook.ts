import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth-check');
        console.log({ response });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [pathname]);

  return { isLoggedIn };
};
