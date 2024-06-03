import { Document } from 'mongoose';

// /models/Artist.ts
export interface IArtist extends Document {
  name: string;
  photo: string;
  genre: string;
  followers: number;
}

export interface Artist {
  _id: string;
  name: string;
  photo: string;
  genre: string;
  followers: number;
  createdAt: string;
}
