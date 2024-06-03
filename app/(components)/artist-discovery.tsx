'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IAlbum } from '../(models)/Album';

interface Album {
  _id: string;
  name: string;
  artwork: string;
  artist: {
    name: string;
  };
  songs: {
    name: string;
  }[];
}
const ArtistDiscovery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('/api/albums');
        console.log('Albums:', response.data);
        setAlbums(response.data.albums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const filteredAlbums = albums.filter((album) => {
    return (
      album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  console.log('album:', filteredAlbums[0]);
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search artists or albums..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredAlbums.slice(0, 50).map((album) => (
          <Image
            key={album._id}
            src={album.artwork}
            alt={album.name}
            width={300}
            height={300}
            className="w-full h-auto mb-2 shadow"
          />
        ))}
      </div>
    </div>
  );
};
export default ArtistDiscovery;
