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

  const handleRandomize = () => {
    setAlbums((prevAlbums) =>
      [...prevAlbums].sort(() => Math.random() - 0.5)
    );
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
    <div className="flex flex-col items-center container mx-auto px-4">
      <div className="flex   items-center gap-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search artists or albums..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRandomize}
          className="px-4  py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Randomize!
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6 ">
        {filteredAlbums.slice(0, 50).map((album) => (
          <Link key={album._id} href={`/albums/${album._id}`}>
            <Image
              key={album._id}
              src={album.artwork}
              alt={album.name}
              width={300}
              height={300}
              className="w-full h-auto mb-2 rounded-lg shadow-md"
            />
            <p className="text-center text-sm text-gray-600">
              {album.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ArtistDiscovery;
