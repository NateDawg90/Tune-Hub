import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../(components)/header';
import Footer from '../(components)/footer';

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
    <>
      <Header />
      <main className="flex flex-grow mx-auto">{children}</main>
      <Footer />
    </>
  );
}
