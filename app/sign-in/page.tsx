import AuthForm from '@/app/(components)/auth-form';
import React from 'react';

export const metadata = {
  title: 'Sign In',
};
const AuthPage = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
