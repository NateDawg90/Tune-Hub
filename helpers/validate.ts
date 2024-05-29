const validateForm = (formData: any) => {
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

  // address1, city, state, zip are required
  if (!address1.trim()) {
    errors.address1 = 'Address is required';
  }

  if (!city.trim()) {
    errors.city = 'City is required';
  }

  if (!state.trim()) {
    errors.state = 'State is required';
  }

  if (!zip.trim()) {
    errors.zip = 'Zip is required';
  }

  return errors;
};
