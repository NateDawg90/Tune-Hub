'use client';
import { useEffect, useRef, useState } from 'react';
import { ActionResult } from '../form';

interface Props {
  onLogout: () => Promise<ActionResult>;
}

const HamburgerMenu = ({ onLogout }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="hover:text-white focus:outline-none flex items-center justify-center"
      >
        <svg
          className="w-6 h-6  stroke-current "
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
        <div className="absolute left-0 top-full mt-1 w-48 rounded-md shadow-lg bg-jet-500 ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-silver hover:bg-jet-400 w-full text-left"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
