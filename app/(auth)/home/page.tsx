// /components/Home.tsx
import ArtistDiscovery from '@/app/(components)/artist-discovery';
import React from 'react';

const Home = async () => {
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
