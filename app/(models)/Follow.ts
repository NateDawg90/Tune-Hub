import { Document, ObjectId } from 'mongoose';
import { IArtist } from './Artist';

// /models/Follow.ts
export interface IFollow extends Document {
  artist: IArtist['_id'];
  user: ObjectId;
}
