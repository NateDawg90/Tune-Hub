import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ARTISTS, SAMPLE_ARTISTS } from '@/constants/1000-artists';
import { Album, Artist, Song } from '@/app/(models)';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const SPOTIFY_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

const connectToDb = async () => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI not found in .env');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
};

const clearDatabase = async () => {
  await Artist.deleteMany({});
  await Album.deleteMany({});
  await Song.deleteMany({});
  console.log('Database cleared');
};

const fetchArtistData = async (artistName: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        },
        params: {
          q: artistName,
          type: 'artist',
        },
      }
    );

    return response.data.artists.items[0];
  } catch (error) {
    console.error(
      `Error fetching artist data for ${artistName}:`,
      error
    );
    return null;
  }
};

const fetchTopTracks = async (artistId: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        },
        params: {
          market: 'US',
        },
      }
    );

    return response.data.tracks;
  } catch (error) {
    console.error(
      `Error fetching top tracks for artist ${artistId}:`,
      error
    );
    return null;
  }
};

const fetchAlbumTracks = async (albumId: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error(
      `Error fetching tracks for album ${albumId}:`,
      error
    );
    return null;
  }
};

const fetchTrackWithPreviewUrl = async (
  trackName: string,
  artistName: string
) => {
  const trackParsed = trackName.replace(/ /g, '%20');
  const artistParsed = artistName.replace(/ /g, '%20');
  const q = `%20track:${trackParsed}%20artist:${artistParsed}`;
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${trackName}&type=track&market=US`,
    {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    }
  );
  const tracks = response.data.tracks.items;
  const track = tracks.find((track: any) => track.preview_url);
  return track || tracks[0];
};

const seedDatabase = async () => {
  await connectToDb();
  await clearDatabase();

  for (const artistName of ARTISTS) {
    const artistData = await fetchArtistData(artistName);
    if (!artistData) continue;

    const artist = new Artist({
      name: artistData.name,
      photo: artistData.images[0]?.url,
      genre: artistData.genres[0],
      followers: artistData.followers.total,
    });

    const topTracks = await fetchTopTracks(artistData.id);
    if (!topTracks) continue;

    const albumData = topTracks.find(
      (track: any) => track.album.album_type === 'album'
    )?.album;
    if (!albumData) continue;

    const album = new Album({
      name: albumData.name,
      artwork: albumData.images[0]?.url,
      year: new Date(albumData.release_date).getFullYear(),
      artist: artist._id,
    });

    const albumTracks = await fetchAlbumTracks(albumData.id);
    if (!albumTracks) continue;

    let trackData = albumTracks[0];
    if (!trackData.preview_url) {
      continue;
    }
    for (const track of albumTracks) {
      const song = new Song({
        name: track.name,
        track: track.track_number,
        length: track.duration_ms,
        album: album._id,
        previewUrl: track.preview_url,
      });
      console.log(song.name, album._id, song.previewUrl);
      await song.save();
      album.songs.push(song._id);
    }
    await artist.save();
    await album.save();
    console.log(
      `Added ${artistName} and their album ${albumData.name}`
    );
  }

  console.log('Database seeding completed');
  mongoose.connection.close();
};

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
  mongoose.connection.close();
});
