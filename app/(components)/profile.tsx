'use client';

import { useEffect, useState } from 'react';
import { Artist } from '../(models)/Artist';
import { fetchFollowedArtists } from '@/helpers/network/follows';
import ArtistDropdown from './artist-dropdown';
import Link from 'next/link';
import { User } from 'lucia';

interface Props {
  user: User;
}
const Profile = ({ user }: Props) => {
  const { email, id: userId, firstName } = user;
  console.log('user', user);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const updateArtists = async () => {
      const fetchedArtists = await fetchFollowedArtists(userId);
      if (fetchedArtists) {
        setArtists(fetchedArtists);
      }
    };

    updateArtists();
  }, [userId]);

  return (
    <div className="flex flex-col my-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        email: {email}
      </h2>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {firstName}&apos;s followed artists
      </h1>
      {artists.map((artist) => (
        <ArtistDropdown
          key={artist._id}
          artistId={artist._id}
          artistName={artist.name}
          userId={userId}
          followers={artist.followers}
        />
      ))}
      {artists.length === 0 && (
        <div className="flex flex-col items-center">
          <p className="text-center text-lg">
            You haven&apos;t followed any artists yet.
          </p>
          <p>
            Go{' '}
            <Link className="font-bold underline" href={'/home'}>
              Home
            </Link>{' '}
            and check some out!
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
