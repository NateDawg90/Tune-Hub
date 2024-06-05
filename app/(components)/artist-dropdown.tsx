import { useEffect, useState } from 'react';
import FollowArtist from './follow-artist';
import { Album } from '../(models)/Album';
import { fetchArtistAlbums } from '@/helpers/network/albums';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface Props {
  artistName: string;
  userId: string;
  artistId: string;
  followers: number;
}

const ArtistDropdown = ({
  artistId,
  userId,
  artistName,
  followers,
}: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const fetchedAlbums = await fetchArtistAlbums(artistId);
      if (fetchedAlbums) {
        setAlbums(fetchedAlbums);
      }
    };

    fetchAlbums();
  }, [artistId]);

  const toggleDropdown = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="mb-4">
      <div className="mt-2 border border-gray-200 rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleDropdown}
            className="flex items-center w-full bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300"
          >
            {collapsed ? (
              <FaChevronRight className="mr-2 text-gray-600" />
            ) : (
              <FaChevronDown className="mr-2 text-gray-600" />
            )}
            <p className="text-lg text-gray-600">{artistName}</p>
          </button>
          <FollowArtist
            artistName={artistName}
            userId={userId}
            artistId={artistId}
            followers={followers}
            showName={false}
          />
        </div>

        {!collapsed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {albums.map((album) => (
              <Link
                key={album._id}
                href={`/albums/${album._id}`}
                passHref
              >
                <Image
                  src={album.artwork}
                  alt={album.name}
                  width={300}
                  height={300}
                  className="w-full h-auto mb-2 rounded shadow"
                />
                <p className="text-sm text-center text-gray-600">
                  {album.name}
                </p>
                <div className="block"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDropdown;
