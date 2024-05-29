// /models/Album.ts
import mongoose from 'mongoose';
import { ISong } from './Song';

export interface IAlbum {
  id: string;
  name: string;
  artwork: string;
  year: number;
  artistId: string;
  songs: ISong[];
}

const albumSchema = new mongoose.Schema<IAlbum>(
  {
    name: String,
    artwork: String,
    year: Number,
    artistId: String,
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Album =
  mongoose.models.Album ||
  mongoose.model<IAlbum>('Album', albumSchema);
export default Album;
