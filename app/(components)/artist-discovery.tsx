'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IArtist } from '../(models)/Artist';
import Image from 'next/image';

const ArtistDiscovery = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await axios.get('/api/artists');
      // setArtists(res.data);
    };
    fetchArtists();
  }, []);

  const artists: IArtist[] = [];
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search artists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="artist-list">
        {filteredArtists.slice(0, 20).map((artist) => (
          <Link href={`/artist/${artist._id}`} key={artist._id}>
            <a>
              <div className="artist-card">
                <Image src={artist.photo} alt={artist.name} />
                <h3>{artist.name}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ArtistDiscovery;
