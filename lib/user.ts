// lib/user.ts
import bcrypt from 'bcrypt';
import clientPromise from './mongodb';

interface User {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  // add other fields as needed
}

const saltRounds = 10;

export const createUser = async (user: User) => {
  const client = await clientPromise;
  const db = client.db('nate'); // Specify your database name
  const usersCollection = db.collection('users');

  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  // Create the new user document
  const newUser = {
    email: user.email,
    password: hashedPassword,
    // add other fields as needed
  };

  // Insert the new user into the database
  const result = await usersCollection.insertOne(newUser);
  return result.insertedId;
};
