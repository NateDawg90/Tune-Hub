'use client';
import React, { useState, useEffect } from 'react';
import {
  checkFollow,
  follow,
  unfollow,
} from '@/helpers/network/follows';
import { fetchArtistFollowers } from '@/helpers/network/artists';

interface Props {
  artistName: string;
  userId: string;
  artistId: string;
  followers: number;
  showName?: boolean;
}

const FollowArtist = ({
  userId,
  artistId,
  artistName,
  followers,
  showName = true,
}: Props) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [currentFollowers, setCurrentFollowers] =
    useState<number>(followers);

  const fetchFollowStatus = async () => {
    const response = await checkFollow(artistId, userId);
    const following = !!response.artist;
    setIsFollowing(following);
  };

  useEffect(() => {
    fetchFollowStatus();
  }, []);
  const fetchFollowers = async () => {
    const res = await fetchArtistFollowers(artistId);
    if (res) setCurrentFollowers(res);
  };

  const toggleFollow = async () => {
    if (isFollowing) {
      await unfollow(artistId, userId);
    } else {
      await follow(artistId, userId);
    }
    fetchFollowStatus();
    fetchFollowers();
  };

  return (
    <div className="ml-4 flex flex-col items-end">
      {showName && (
        <p className="text-3xl text-gray-600">{artistName}</p>
      )}
      <p className="text-sm text-gray-600 text-nowrap">
        {currentFollowers} followers
      </p>

      <button
        onClick={toggleFollow}
        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default FollowArtist;
