import { logout } from '@/helpers/auth-actions';
import HamburgerMenu from './menus/hamburger-menu';
import Link from 'next/link';
import ProfileIcon from 'icon/user-regular.svg';
interface Props {
  email: string;
}
const Header = ({ email }: Props) => {
  return (
    <header className="w-full bg-jet-500 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <HamburgerMenu onLogout={logout} />
        <div className="flex items-center justify-center">
          <Link
            href="/home"
            className="text-2xl font-bold text-silver"
          >
            Tunehub
          </Link>
        </div>
        <div className="flex items-center">
          Welcome, {email}
          <Link
            href={'/profile'}
            className="text-silver hover:text-davys-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-davys-gray ml-4"
          >
            <ProfileIcon className="icon h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
