// /components/Home.tsx
import React from 'react';
import ArtistDiscovery from '../../(components)/artist-discovery';
import UserList from '../../(components)/user-list';
import { verifyAuth } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import connectToDb from '@/lib/mongoose';

export const metadata: Metadata = {
  title: 'Login to Tunehub',
  description: 'Nextjs project',
};

const Home = async () => {
  await connectToDb();

  const { user } = await verifyAuth();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Tunehub</h1>
        {/* Add your animation here */}
        <UserList />
        <p>Discover new music and artists</p>
        <ArtistDiscovery />
      </div>
    </div>
  );
};

export default Home;
