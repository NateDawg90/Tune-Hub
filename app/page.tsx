// /components/Home.tsx
import React from 'react';
import AuthForm from './(components)/auth-form';
import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/lucia';
import connectToDb from '@/lib/mongoose';

interface Props {
  searchParams: {
    signup: string;
  };
}
const Auth = async ({ searchParams }: Props) => {
  await connectToDb();
  const { user } = await verifyAuth();
  const signUpMode = searchParams.signup === 'true';
  if (user) {
    redirect('/home');
  }
  return (
    <main className="flex-grow flex items-center justify-center">
      <AuthForm signUpMode={signUpMode} />
    </main>
  );
};

export default Auth;
