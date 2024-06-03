import mongoose, { Document, Schema } from 'mongoose';

// /models/Artist.ts
export interface IArtist extends Document {
  name: string;
  photo: string;
  genre: string;
  followers: number;
}

const artistSchema = new Schema<IArtist>(
  {
    name: String,
    photo: String,
    genre: String,
    followers: Number,
  },
  {
    timestamps: true,
  }
);

const Artist =
  mongoose.models.Artist ||
  mongoose.model<IArtist>('Artist', artistSchema);
export default Artist;
