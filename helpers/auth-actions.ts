'use server';

import { ActionResult } from '@/app/(components)/form';
import User from '@/app/(models)/User';
import { lucia, verifyAuth } from '@/lib/lucia';
import connectToDb from '@/lib/mongoose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { AuthMode } from '@/constants';

export const logout = async (): Promise<ActionResult> => {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
};

export async function signUp(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  'use server';
  const email = formData.get('email');
  const password = formData.get('password');
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValid = emailRegex.test(email as string);
  const passwordInvalid =
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255;
  if (!emailValid) {
    return {
      error: 'Invalid email',
    };
  }
  if (passwordInvalid) {
    return {
      error: 'Invalid password',
    };
  }
  const hashedPassword = await new Argon2id().hash(password);

  try {
    // await connectToDb();
    const user = await User.create({
      email: email,
      password: hashedPassword,
    });

    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e) {
    console.log('error', e);
    return {
      error: 'An unknown error occurred',
    };
  }
  return redirect('/');
}

export const login = async (
  _: any,
  formData: FormData
): Promise<ActionResult> => {
  'use server';
  const email = formData.get('email');
  const password = formData.get('password');
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValid = emailRegex.test(email as string);
  const passwordInvalid =
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255;
  if (!emailValid) {
    return {
      error: 'Invalid email',
    };
  }
  if (passwordInvalid) {
    return {
      error: 'Invalid password',
    };
  }

  await connectToDb();
  const existingUser = await User.findOne({
    email,
  });
  if (!existingUser) {
    return {
      error: 'Incorrect email',
    };
  }
  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    return {
      error: 'Incorrect  password',
    };
  }
  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
};

export const auth = async (
  mode: AuthMode,
  _: any,
  formData: FormData
) => {
  if (mode === 'login') {
    return login(_, formData);
  }
  return signUp(_, formData);
};
