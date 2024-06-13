import { Album } from '@/app/(models)/Album';
import axios from 'axios';

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
