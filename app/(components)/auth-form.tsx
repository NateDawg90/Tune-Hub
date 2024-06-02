import React from 'react';
import { ActionResult, Form } from './form';
import Link from 'next/link';
import { auth } from '@/helpers/auth-actions';

export interface AuthFormProps {
  signUpMode: boolean;
}
const AuthForm = ({ signUpMode }: AuthFormProps) => {
  const onConfirm = auth.bind(null, signUpMode);
  return (
    <div className="w-full   my-auto bg-jet-300 p-8 border border-gray rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-8 text-silver">
        {signUpMode ? 'Sign Up' : 'Log In'}
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
        <button className="w-full py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-davys-gray hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray">
          Submit
        </button>
        {signUpMode ? (
          <Link
            className="mt-4 block underline"
            href="/?signup=false"
          >
            Log into your account
          </Link>
        ) : (
          <Link className="mt-4 block underline" href="/?signup=true">
            Create a new account
          </Link>
        )}
      </Form>
    </div>
  );
};

export default AuthForm;
