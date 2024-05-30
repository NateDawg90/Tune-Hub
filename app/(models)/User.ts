import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  password: string;
}
const userSchema = new Schema<IUser>(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
