'use server';

import { ActionResult } from '@/app/(components)/form';
import { User } from '@/app/(models)';
import { lucia, verifyAuth } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

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
  const firstName = formData.get('firstName');
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValid = emailRegex.test(email as string);
  const passwordInvalid =
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255;
  const firstNameInvalid =
    typeof firstName !== 'string' || firstName.length < 1;
  if (!emailValid) return { error: 'Invalid email' };

  if (passwordInvalid)
    return {
      error: 'Invalid password',
    };
  if (firstNameInvalid)
    return {
      error: 'Invalid first name',
    };

  const hashedPassword = await new Argon2id().hash(password);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
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
  return redirect('/home');
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
  return redirect('/home');
};

export const auth = async (
  signUpMode: boolean,
  prevState: any,
  formData: FormData
) => {
  if (signUpMode) {
    return signUp(prevState, formData);
  }
  return login(prevState, formData);
};
