import mongoose from 'mongoose';
import { Artist, Album, Song } from '@/app/(models)';
import axios from 'axios';
import { ARTISTS, SAMPLE_ARTISTS } from '@/constants/1000-artists';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const seedDatabase = async () => {
  const token = process.env.SPOTIFY_ACCESS_TOKEN;
  const mongoUri = process.env.MONGODB_URI;
  const payload = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await mongoose.connect(mongoUri!);
    await clearDatabase();

    for (let i in SAMPLE_ARTISTS) {
      const artistName = ARTISTS[i];
      const searchResponse = await axios.get(
        `https://api.spotify.com/v1/search/?q=${artistName}&type=artist`,
        payload
      );
      const artistData = searchResponse.data.artists.items[0];
      const artist = new Artist({
        name: artistData.name,
        photo: artistData.images[0]?.url,
        genre: artistData.genres[0],
        followers: artistData.followers.total,
      });
      console.log('Seeding artist:', artistData.name);
      await artist.save();

      const albumsResponse = await axios.get(
        `https://api.spotify.com/v1/artists/${artistData.id}/albums`,
        payload
      );

      const albumData = albumsResponse.data.items[0];

      const album = new Album({
        name: albumData.name,
        artwork: albumData.images[0]?.url,
        year: new Date(albumData.release_date).getFullYear(),
        artist: artist._id,
      });

      const tracksResponse = await axios.get(
        `https://api.spotify.com/v1/albums/${albumData.id}/tracks`,
        payload
      );

      const tracks = tracksResponse.data.items;
      for (const trackData of tracks) {
        const song = new Song({
          name: trackData.name,
          track: trackData.track_number,
          length: trackData.duration_ms,
          album: album._id,
          previewUrl: trackData.preview_url,
        });
        console.log(song.name, album._id, song.previewUrl);
        await song.save();

        album.songs.push(song._id);
      }

      console.log('Seeding album:', albumData.name);
      await album.save();
    }

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  await Artist.deleteMany({});
  await Album.deleteMany({});
  await Song.deleteMany({});
  console.log('Database cleared');
};

seedDatabase();
