import User from '../(models)/User';
import { NextResponse } from 'next/server';
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { email, password } = req.body;
//   // Implement authentication logic
//   const user = users.find(
//     (u) => u.email === email && u.password === password
//   );
//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// }

export async function POST(req: any) {
  try {
    const body = req.json();
    const userData = body.formData;
    await User.create(userData);

    return NextResponse.json(
      { message: 'user created' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'error', error },
      { status: 500 }
    );
  }
}
