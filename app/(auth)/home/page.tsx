// /components/Home.tsx
import ArtistDiscovery from '@/app/(components)/artist-discovery';
import { verifyAuth } from '@/lib/lucia';
import connectToDb from '@/db/mongoose';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = async () => {
  await connectToDb();
  const { user } = await verifyAuth();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Tunehub</h1>
        {/* Add your animation here */}
        <p>Discover new music and artists</p>
        <ArtistDiscovery />
      </div>
    </div>
  );
};

export default Home;
