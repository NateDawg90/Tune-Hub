// /models/Album.ts
import { Document, ObjectId } from 'mongoose';
import { Artist, IArtist } from './Artist';
import { Song } from './Song';

export interface IAlbum extends Document {
  id: string;
  name: string;
  artwork: string;
  year: number;
  artist: IArtist['_id'];
  songs: ObjectId[]; // Correct type
}

export interface Album {
  _id: string;
  name: string;
  artwork: string;
  artist: Artist;
  songs: Song[];
}
