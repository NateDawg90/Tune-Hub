'use client';

import { useEffect, useState } from 'react';
import { Artist } from '../(models)/Artist';
import { fetchFollowedArtists } from '@/helpers/network/follows';
import ArtistDropdown from './artist-dropdown';

interface Props {
  userId: string;
  email: string;
}
const Profile = ({ userId, email }: Props) => {
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
    <div className="flex flex-col">
      <h1 className="">{email}&apos;s followed artists</h1>
      {artists.map((artist) => (
        <ArtistDropdown
          key={artist._id}
          artistId={artist._id}
          artistName={artist.name}
          userId={userId}
          followers={artist.followers}
        />
      ))}
    </div>
  );
};

export default Profile;
