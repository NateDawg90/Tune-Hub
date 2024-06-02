import axios from 'axios';

const getAccessToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

export const getPopularArtists = async () => {
  const token = await getAccessToken();
  const response = await axios.get(
    'https://api.spotify.com/v1/artists?ids=your-artist-ids',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.artists;
};
