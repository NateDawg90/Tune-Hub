import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../(components)/header';
import Footer from '../(components)/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to Tunehub',
  description: 'Nextjs authentication',
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center  bg-jet-500 ${inter.className}`}
    >
      <Header />
      <main className="flex flex-grow mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
