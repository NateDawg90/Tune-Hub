// /components/Home.tsx
import React, { useState, useEffect } from 'react';
import AuthForm from './(components)/auth-form';
import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/lucia';
import connectToDb from '@/lib/mongoose';

interface Props {
  searchParams: {
    signup: string;
  };
}
const Home = async ({ searchParams }: Props) => {
  await connectToDb();
  const { user } = await verifyAuth();
  const signUpMode = searchParams.signup === 'true';
  if (!!user) {
    redirect('/home');
  }
  return <AuthForm signUpMode={signUpMode} />;
};

export default Home;
