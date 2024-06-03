'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Album } from '@/app/(models)/Album';
import Image from 'next/image';
import Song from './song';
import { useMusicPlayer } from '@/store/music-player-context';
interface AlbumProps {
  id: string;
}
const AlbumComponent = ({ id }: AlbumProps) => {
  const [album, setAlbum] = useState<Album>();
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentSong, isPlaying, pauseSong, playSong } =
    useMusicPlayer();

  useEffect(() => {
    console.log('id:', id);
    if (id) {
      const fetchAlbum = async () => {
        try {
          const response = await axios.get(`/api/albums/${id}`);
          setAlbum(response.data);
        } catch (err) {
          console.error('Error fetching album:', err);
        }
      };

      fetchAlbum();
    }
  }, [id]);

  const handleFollowArtist = async () => {
    try {
      // Implement the follow artist logic here
      setIsFollowing(true);
    } catch (err) {
      console.error('Error following artist:', err);
    }
  };

  if (!album) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Image
          width={500}
          height={500}
          src={album.artwork}
          alt={album.name}
          className="w-48 h-48 object-cover rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{album.name}</h1>
          <p className="text-lg text-gray-600">{album.artist.name}</p>
          <button
            onClick={handleFollowArtist}
            className={`mt-2 px-4 py-2 rounded ${
              isFollowing ? 'bg-gray-300' : 'bg-blue-500 text-white'
            }`}
            disabled={isFollowing}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tracks</h2>
        <ul className="list-disc list-inside">
          {album.songs.map((song) => (
            <Song
              key={song._id}
              song={song}
              isPlaying={currentSong?._id === song._id && isPlaying}
              onPlay={playSong}
              onPause={pauseSong}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumComponent;
