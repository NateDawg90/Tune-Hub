// lib/lucia.ts
import { Lucia } from 'lucia';
import { MongoClient } from 'mongodb';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';

interface UserDoc {
  _id: string;
  // add other fields as needed
}

interface SessionDoc {
  _id: string;
  user_id: string;
  expires_at: Date;
  // add other fields as needed
}

const client = new MongoClient(process.env.MONGODB_URI!);

const connectToDatabase = async () => {
  await client.connect();
  const db = client.db('your-database-name'); // Specify your database name
  const User = db.collection<UserDoc>('users');
  const Session = db.collection<SessionDoc>('sessions');

  const adapter = new MongodbAdapter(Session, User);

  const lucia = new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  });

  return lucia;
};

export const auth = await connectToDatabase();

export type Auth = typeof auth;
