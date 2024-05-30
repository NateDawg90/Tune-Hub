'use client';
import { useApiUsers } from '@/hooks/use-api-users.hook';

const UserList = () => {
  const { users, loading, error, deleteUser } = useApiUsers();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Users</h2>
      <div className="flex flex-wrap gap-4">
        {/* Add your user list here */}
        {users.length ? (
          users.map((user) => (
            <div
              className="flex flex-col p-3 m-2 border border-gray rounded-lg shadow-md"
              key={user._id}
            >
              {/* close button */}
              <button
                className="self-end"
                onClick={() => deleteUser(user._id)}
              >
                X
              </button>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  );
};

export default UserList;
