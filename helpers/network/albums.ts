import { Album } from '@/app/(models)/Album';
import axios from 'axios';

export const fetchAlbum = async (
  id: string
): Promise<Album | null> => {
  try {
    const response = await axios.get(`/api/albums/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching album:', err);
    return null;
  }
};

export const fetchArtistAlbums = async (
  artistId: string
): Promise<Album[] | null> => {
  try {
    const response = await axios.get(`/api/albums`, {
      params: {
        artistId,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching artist albums:', err);
    return null;
  }
};
