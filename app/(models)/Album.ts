// /models/Album.ts
import mongoose, { Document, ObjectId } from 'mongoose';
import { ISong } from './Song';
import { IArtist } from './Artist';

export interface IAlbum extends Document {
  id: string;
  name: string;
  artwork: string;
  year: number;
  artist: IArtist['_id'];
  songs: ObjectId[]; // Correct type
}

const albumSchema = new mongoose.Schema<IAlbum>(
  {
    name: String,
    artwork: String,
    year: Number,
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
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
