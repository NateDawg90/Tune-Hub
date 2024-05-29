import mongoose, { Schema } from 'mongoose';

// /models/Follow.ts
export interface IFollow {
  artistId: string;
  userId: string;
}

const followSchema = new Schema<IFollow>(
  {
    artistId: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Follow =
  mongoose.models.Follow ||
  mongoose.model<IFollow>('Follow', followSchema);

export default Follow;
