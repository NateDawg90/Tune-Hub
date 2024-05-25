'use client';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { signup } from '@/helpers/auth-actions';

const AuthForm: React.FC = () => {
  const [formState, formAction] = useFormState(signup, undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {formState?.errors && <ul className=""></ul>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthForm;
