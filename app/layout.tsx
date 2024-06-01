import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tunehub',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={`min-h-screen flex flex-col items-center  bg-jet-500 ${inter.className}`}
        >
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
