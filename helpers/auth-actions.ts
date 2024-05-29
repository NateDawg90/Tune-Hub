'use server';

import { createAuthSession } from '@/lib/lucia';
import { createUser } from '@/lib/user';
import { redirect } from 'next/navigation';

const validateForm = (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const address1 = formData.get('address1');
  const address2 = formData.get('address2');
  const city = formData.get('city');
  const state = formData.get('state');
  const zip = formData.get('zip');

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Invalid email';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // // address1, city, state, zip are required
  // if (!address1.trim()) {
  //   errors.address1 = 'Address is required';
  // }

  // if (!city.trim()) {
  //   errors.city = 'City is required';
  // }

  // if (!state.trim()) {
  //   errors.state = 'State is required';
  // }

  // if (!zip.trim()) {
  //   errors.zip = 'Zip is required';
  // }

  return errors;
};

export const signup = async (formData: FormData) => {
  const email = formData.get('email') ?? '';
  const password = formData.get('password') ?? '';
  const errors = validateForm(formData);

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    const id = await createUser({ email, password });
    await createAuthSession(id);
    redirect('/');
  } catch (error) {
    console.error(error);
    return {
      errors: {
        email: 'seems like email already exists',
      },
    };
  }
};
