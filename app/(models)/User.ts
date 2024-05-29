import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}
const userSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
