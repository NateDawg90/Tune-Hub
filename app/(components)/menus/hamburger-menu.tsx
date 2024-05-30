'use client';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in.hook';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ActionResult } from '../form';

interface Props {
  onLogout: () => Promise<ActionResult>;
}
const HamburgerMenu = ({ onLogout }: Props) => {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await onLogout();
      toggleOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
    >
      <button
        onClick={toggleOpen}
        className="text-jet-500 hover:text-davys-gray focus:outline-none "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-silver text-jet-500 ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {isLoggedIn ? (
              <button
                type="button"
                className="block px-4 py-2 text-sm  hover:bg-gray-100"
                role="menuitem"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-jet-300"
                  role="menuitem"
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  Log In
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-jet-300"
                  role="menuitem"
                  onClick={() => {
                    router.push('/sign-up');
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
