import { useState, useEffect } from 'react';

const useIsDesktop = (breakpoint = 498) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsDesktop(window.innerWidth > breakpoint);
    };

    // Check on initial load
    checkScreenWidth();

    // Add event listener to window resize
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [breakpoint]);

  return isDesktop;
};

export default useIsDesktop;
