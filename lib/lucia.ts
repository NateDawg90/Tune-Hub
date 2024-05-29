// src/auth.ts
import { Lucia, Session } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';

// connect to mongoose here
import mongoose from 'mongoose';
import connectToDb from './mongoose';
import User from '@/app/(models)/User';

await connectToDb();

// your adapter
const adapter = new MongodbAdapter(Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
}
