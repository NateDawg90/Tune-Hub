// /components/Home.tsx
import React from 'react';
import ArtistDiscovery from './(components)/artist-discovery';
import UserList from './(components)/user-list';

const Home = () => {
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
