'use client';

interface Props {
  email: string;
}
const Greeting = ({ email }: Props) => {
  // const { user } = useIsLoggedIn();

  // if (!user) {
  //   return null;
  // }
  return (
    <div className="flex items-center">
      <p className="text-jet-500">Welcome, {email}</p>
    </div>
  );
};
export default Greeting;
