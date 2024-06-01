import Header from '../(components)/header';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex flex-grow mx-auto">{children}</main>
    </>
  );
}
