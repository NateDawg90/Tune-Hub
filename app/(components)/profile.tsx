'use client';

import { useEffect, useState } from 'react';
import { Artist } from '../(models)/Artist';
import FollowArtist from './follow-artist';
import { fetchFollowedArtists } from '@/helpers/network/follows';

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

  console.log({ artists });
  return (
    <div className="flex flex-col">
      <h1 className="">{email}&apos;s followed artists</h1>
      {artists.map((artist) => (
        <div key={artist._id}>
          <FollowArtist
            userId={userId}
            artistId={artist._id}
            artistName={artist.name}
            followers={artist.followers}
          />
        </div>
      ))}
    </div>
  );
};

export default Profile;
