import { ObjectId } from 'mongoose';
import { Album } from './Album';

// /models/Song.ts
export interface ISong {
  track: number;
  name: string;
  album: ObjectId;
  length: string;
}

export interface Song {
  _id: string;
  track: number;
  name: string;
  album: Album;
  length: string;
  createdAt: string;
}
