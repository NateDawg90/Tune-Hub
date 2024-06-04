import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
}
