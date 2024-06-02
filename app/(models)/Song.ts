import mongoose, { ObjectId, Schema } from 'mongoose';

// /models/Song.ts
export interface ISong {
  track: number;
  name: string;
  album: ObjectId;
  length: string;
}

const songSchema = new Schema<ISong>(
  {
    track: Number,
    name: String,
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    length: String,
  },
  {
    timestamps: true,
  }
);

const Song =
  mongoose.models.Song || mongoose.model<ISong>('Song', songSchema);
export default Song;
