import mongoose, { Schema } from 'mongoose';

// /models/Song.ts
export interface ISong {
  track: number;
  name: string;
  albumId: string;
  length: string;
}

const songSchema = new Schema<ISong>(
  {
    track: Number,
    name: String,
    albumId: String,
    length: String,
  },
  {
    timestamps: true,
  }
);

const Song =
  mongoose.models.Song || mongoose.model<ISong>('Song', songSchema);
export default Song;
