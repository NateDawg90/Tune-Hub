// /components/Home.tsx
import ArtistDiscovery from '@/app/(components)/artist-discovery';
import { Hero } from '@/app/(components)/hero';
import React from 'react';

const Home = async () => {
  return (
    <div className="home">
      <Hero />

      <ArtistDiscovery />
    </div>
  );
};

export default Home;
