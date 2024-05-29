'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const defaultFormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const AuthForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add create user
    const res = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
    console.log(formData);

    router.refresh();
    router.push('/');
  };

  return (
    <div className="max-w-md w-full my-auto bg-jet-300 p-8 border border-gray rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-8 text-silver">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleFormDataChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            value={formData.firstName}
            onChange={handleFormDataChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            value={formData.lastName}
            onChange={handleFormDataChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleFormDataChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-davys-gray hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
