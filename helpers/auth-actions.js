'use server';

export const signup = async (prevState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Invalid email';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
};
