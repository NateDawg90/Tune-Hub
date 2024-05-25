// lib/lucia.ts
import { Lucia } from 'lucia';
import { MongoClient } from 'mongodb';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { cookies } from 'next/headers';

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

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
