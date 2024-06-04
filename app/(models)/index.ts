import mongoose, { Document, Schema } from 'mongoose';
import { IArtist } from './Artist';
import { IAlbum } from './Album';
import { ISong } from './Song';
import { IFollow } from './Follow';
import { IUser } from './User';

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

const albumSchema = new Schema<IAlbum>(
  {
    name: String,
    artwork: String,
    year: Number,
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const songSchema = new Schema<ISong>(
  {
    track: Number,
    name: String,
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    length: String,
    previewUrl: String,
  },
  {
    timestamps: true,
  }
);

const followSchema = new Schema<IFollow>(
  {
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema<IUser>(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
export const Artist =
  mongoose.models.Artist ||
  mongoose.model<IArtist>('Artist', artistSchema);
export const Album =
  mongoose.models.Album ||
  mongoose.model<IAlbum>('Album', albumSchema);
export const Song =
  mongoose.models.Song || mongoose.model<ISong>('Song', songSchema);
export const Follow =
  mongoose.models.Follow ||
  mongoose.model<IFollow>('Follow', followSchema);
