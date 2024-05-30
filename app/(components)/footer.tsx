const Footer = () => {
  return (
    <footer className="w-full bg-silver py-4 shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-between px-4">
        <div className="flex space-x-4">
          {/* Affiliate links */}
          <a
            href="#"
            className="text-jet-500 hover:text-davys-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-davys-gray"
          >
            Affiliate Link 1
          </a>
          <a
            href="#"
            className="text-jet-500 hover:text-davys-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-davys-gray"
          >
            Affiliate Link 2
          </a>
        </div>
        <div className="text-jet-500 mt-4">
          © 2024 Nate Johnson. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
