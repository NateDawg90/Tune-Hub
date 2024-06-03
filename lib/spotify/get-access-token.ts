import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const getAccessToken = async () => {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const client_secret =
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

  const url = 'https://accounts.spotify.com/api/token';
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id,
    client_secret,
  });

  try {
    const response = await axios.post(url, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Spotify token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
};

getAccessToken();
