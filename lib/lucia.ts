// lib/auth.ts
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import mongoose from 'mongoose';

import { Lucia } from 'lucia';
import type { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import connectToDb from '@/db/mongoose';

export const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions'),
  mongoose.connection.collection('users')
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: any) => {
    return {
      email: attributes.email,
      firstName: attributes.firstName,
    };
  },
});

export const verifyAuth = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId =
      cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    await connectToDb();
    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(
          result.session.id
        );
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return JSON.parse(JSON.stringify(result));
  }
);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
}
