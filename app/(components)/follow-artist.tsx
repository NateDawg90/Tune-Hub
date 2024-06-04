'use client';
import React, { useState, useEffect } from 'react';
import {
  checkFollow,
  follow,
  unfollow,
} from '@/helpers/network/follows';

interface Props {
  artistName: string;
  userId: string;
  artistId: string;
  followers: number;
}

const FollowArtist: React.FC<Props> = ({
  userId,
  artistId,
  artistName,
  followers,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const fetchFollowStatus = async () => {
    const response = await checkFollow(artistId, userId);
    const following = !!response.artist;
    setIsFollowing(following);
  };
  useEffect(() => {
    fetchFollowStatus();
  }, []);

  const handleFollow = async () => {
    await follow(artistId, userId);
    await fetchFollowStatus();
  };

  const handleUnfollow = async () => {
    await unfollow(artistId, userId);
    await fetchFollowStatus();
  };

  return (
    <div className="ml-4">
      <p className="text-lg text-gray-600">{artistName}</p>
      <p className="text-sm text-gray-600">{followers} followers</p>

      <button
        onClick={isFollowing ? handleUnfollow : handleFollow}
        className="mt-2 mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default FollowArtist;
