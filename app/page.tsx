import AuthForm from '@/app/(components)/auth-form';
import { verifyAuth } from '@/lib/lucia';
import connectToDb from '@/lib/mongoose';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: 'Lets get you logged in',
};
const AuthPage = async () => {
  await connectToDb();
  const { user } = await verifyAuth();
  if (user) {
    console.log('already logged in, redirecting home');
    return redirect('/home');
  }

  return <AuthForm />;
};

export default AuthPage;
