import AuthForm from '@/app/(components)/auth-form';
import { login } from '@/helpers/auth-actions';
import { validateRequest } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: 'Login',
};
const AuthPage = async () => {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }

  return <AuthForm isLogin={true} onConfirm={login} />;
};

export default AuthPage;
