// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../lib/lucia';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await auth.createUser({
      primaryKey: {
        providerId: 'email',
        providerUserId: email,
        password,
      },
      attributes: {
        email,
      },
    });

    const session = await auth.createSession(user.userId);
    res.status(201).json({ user, session });
  } catch (error) {
    res.status(400).json({ error: 'Failed to sign up' });
  }
}
