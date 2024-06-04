import { Document } from 'mongoose';
import { IArtist } from './Artist';
import { IUser } from './User';

// /models/Follow.ts
export interface IFollow extends Document {
  artist: IArtist['_id'];
  user: IUser['_id'];
}
