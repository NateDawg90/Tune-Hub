// /components/Home.tsx
import React, { useState, useEffect } from 'react';
import AuthForm from './(components)/auth-form';
import { login } from '@/helpers/auth-actions';
import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/lucia';

const Home = async () => {
  const { user } = await verifyAuth();

  if (!!user) {
    redirect('/home');
  }
  return <AuthForm onConfirm={login} />;
};

export default Home;
