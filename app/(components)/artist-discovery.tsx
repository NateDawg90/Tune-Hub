'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Album } from '../(models)/Album';

const ArtistDiscovery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('/api/albums');
        if (!response.data) return console.error('No albums found');
        setAlbums(response.data);
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

  return (
    <div className="flex flex-col items-center container mx-auto">
      <div className="w-1/2 ">
        <input
          type="text"
          placeholder="Search artists or albums..."
          value={searchTerm}
          onChange={handleSearchChange}
          className=" p-2 mb-4 border rounded"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredAlbums.slice(0, 50).map((album) => (
          <Link key={album._id} href={`/albums/${album._id}`}>
            <Image
              key={album._id}
              src={album.artwork}
              alt={album.name}
              width={300}
              height={300}
              className="w-full h-auto mb-2 shadow"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ArtistDiscovery;
