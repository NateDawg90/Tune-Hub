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
): Promise<Album[]> => {
  try {
    const response = await axios.get(
      `/api/albums/artist/${artistId}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching albums by artist:', err);
    throw err;
  }
};
