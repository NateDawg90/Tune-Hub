import axios from 'axios';

export const fetchArtistFollowers = async (
  artistId: string
): Promise<number | null> => {
  try {
    const response = await axios.get(`/api/artists/${artistId}`);
    return response.data.followers;
  } catch (err) {
    console.error('Error fetching artist followers:', err);
    return null;
  }
};
