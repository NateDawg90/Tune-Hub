import { logout } from '@/helpers/auth-actions';
import HamburgerMenu from './menus/hamburger-menu';
import Link from 'next/link';
import ProfileIcon from 'icon/user-regular.svg';
import Image from 'next/image';
interface Props {
  email: string;
}
const Header = ({ email }: Props) => {
  return (
    <header className="w-full bg-jet-500 py-4 shadow-md text-silver">
      <div className="container mx-auto flex  justify-between px-4">
        <div className="flex w-full">
          <HamburgerMenu onLogout={logout} />
          <Link
            href="/home"
            className="text-2xl font-bold text-silver ml-3"
          >
            <Image
              src={'/img/logo.png'}
              alt="logo"
              width={150}
              height={50}
            />
          </Link>
        </div>
        <div className="flex items-center ">
          <div
            className="text-xs
          "
          >
            Welcome, <div className="text-sm">{email}</div>
          </div>
          <Link
            href={'/profile'}
            className="hover:text-white text-silver focus:outline-none   ml-4"
          >
            <ProfileIcon className="h-5 stroke-current fill-current" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
