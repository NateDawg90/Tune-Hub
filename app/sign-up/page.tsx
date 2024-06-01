import React from 'react';
import AuthForm from '../(components)/auth-form';
import { verifyAuth } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import { signUp } from '@/helpers/auth-actions';

export const metadata = {
  title: 'Sign Up',
};
const AuthPage = async () => {
  const { user } = await verifyAuth();
  if (user) {
    return redirect('/');
  }

  return <AuthForm onConfirm={signUp} />;
};

export default AuthPage;
