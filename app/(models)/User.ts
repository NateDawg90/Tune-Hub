import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  password: string;
  createdAt: string;
}
