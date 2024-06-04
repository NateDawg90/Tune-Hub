import axios from 'axios';
import { IFollow } from '@/app/(models)/Follow';
import { Artist } from '@/app/(models)/Artist';
export const follow = async (artistId: string, userId: string) => {
  try {
    const res = await axios.post(`/api/follows`, {
      artistId,
      userId,
    });
    console.log('follow:', res);
  } catch (error) {
    console.error('Error following artist:', error);
  }
};

export const unfollow = async (artistId: string, userId: string) => {
  try {
    const res = await axios.delete(`/api/unfollow`, {
      data: {
        artistId,
        userId,
      },
    });
    console.log('unfollow:', res);
  } catch (error) {
    console.error('Error unfollowing artist:', error);
  }
};

export const checkFollow = async (
  artistId: string,
  userId: string
) => {
  try {
    const res = await axios.get(`/api/follows`, {
      params: {
        artistId,
        userId,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error checking follow:', error);
  }
};

export const fetchFollowedArtists = async (
  userId: string
): Promise<Artist[] | null> => {
  try {
    const res = await axios.get(`/api/follows`, {
      params: {
        userId,
      },
    });
    const follows = res.data.follows;
    const artists = follows.map((follow: IFollow) => follow.artist);
    return artists;
  } catch (error) {
    console.error('Error fetching followed artists:', error);
    return null;
  }
};
