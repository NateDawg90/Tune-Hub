import { IUser } from '@/app/(models)/User';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useApiUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [update, setUpdate] = useState(false); // State to track updates

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>('/api/users');
        setUsers(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchUsers();
  }, [update]); // Empty dependency array ensures this runs only once after the initial render

  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);
      const data = await res.data;
      console.log({ data }, 'deleted user');
      setUpdate(!update); // Update the state to trigger a re-fetch
    } catch (error) {
      console.error({ error });
      return { message: 'error', error };
    }
  };

  return { users, loading, error, deleteUser };
};
