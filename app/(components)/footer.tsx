const Footer = () => {
  return (
    <footer className="w-full bg-jet-500 text-silver py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="mt-2 flex gap-4">
          <a
            href="https://linkedin.com/in/nathan-johnson-66310941"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple"
          >
            <svg
              className="w-6 h-6 text-silver hover:text-davys-gray transition-colors duration-200"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9.05h3.56v11.4zM5.34 7.55c-1.14 0-2.06-.92-2.06-2.06 0-1.14.93-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm14.66 12.9h-3.56v-5.53c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92v5.63H8.92V9.05h3.41v1.55h.05c.48-.91 1.64-1.87 3.37-1.87 3.6 0 4.26 2.37 4.26 5.45v6.27z" />
            </svg>
          </a>
          <a
            href="https://github.com/natejohnson"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple"
          >
            <svg
              className="w-6 h-6 text-silver hover:text-purple transition-colors duration-200"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.4.5 0 6 0 12.8c0 5.4 3.3 10 7.8 11.6.6.1.8-.3.8-.6V21c-3.2.7-3.8-1.4-3.8-1.4-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.7.1-.7 1.4.1 2.2 1.5 2.2 1.5 1.2 2 3.1 1.4 3.8 1.1.1-.8.5-1.4.9-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.3a11.8 11.8 0 0 1 6.2 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.7-5.6 6.1.5.5.9 1.3.9 2.6v3.9c0 .3.2.8.8.6C20.7 22.8 24 18.2 24 12.8 24 6 18.6.5 12 .5z" />
            </svg>
          </a>
          <a
            href="mailto:rnatejohnson@gmail.com"
            className="hover:text-purple"
          >
            <svg
              className="w-6 h-6 text-silver hover:text-purple transition-colors duration-200"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 12.713L0 4.27v15.406h24V4.271L12 12.713zm0-2.408L24 3.482v-.048H0v.049l12 6.823z" />
            </svg>
          </a>{' '}
        </div>
        <p className="text-sm">
          &copy; 2024 Nate Johnson. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
