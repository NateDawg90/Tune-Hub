'use client';
import React from 'react';
import { Form } from './form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { auth, login } from '@/helpers/auth-actions';
import { AuthMode } from '@/constants';

const AuthForm = () => {
  const mode: AuthMode =
    (useSearchParams().get('mode') as AuthMode) ?? AuthMode.Signup;
  // const onConfirm = auth.bind(null, mode);
  const onConfirm = login;
  return (
    <div className="w-full my-auto bg-jet-300 p-8 border border-gray rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-8 text-silver">
        {mode === AuthMode.Login ? 'Login' : 'Sign Up'}
      </h2>
      <Form className="space-y-6" action={onConfirm}>
        <div>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" id="password" />
        </div>
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-davys-gray hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray">
          Submit
        </button>
        <p className="text-silver underline">
          {mode === AuthMode.Login ? (
            <Link href="/?mode=signup">Create an account</Link>
          ) : (
            <Link href="/?mode=login">
              Login with existing account
            </Link>
          )}
        </p>
      </Form>
    </div>
  );
};

export default AuthForm;
