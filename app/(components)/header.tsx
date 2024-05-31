import { logout } from '@/helpers/auth-actions';
import HamburgerMenu from './menus/hamburger-menu';
import Greeting from './greeting';

const Header = () => {
  return (
    <header className="w-full bg-silver py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <HamburgerMenu onLogout={logout} />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-jet-500">Tunehub</h1>
        </div>
        <div className="flex items-center">
          <Greeting />
          <button className="text-jet-500 hover:text-davys-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-davys-gray ml-4">
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
                d="M5.121 20.121A8.965 8.965 0 0012 22a8.965 8.965 0 006.879-1.879M12 14a7 7 0 110-14 7 7 0 010 14zm0 0c-2.737 0-5.095 1.342-6.121 3.121"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
