import { User } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDb();
    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDb();

    const body = await req.json();
    const userData = body.formData;
    await User.create(userData);

    return NextResponse.json(
      { message: 'user created' },
      { status: 200 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: 'error', error },
      { status: 500 }
    );
  }
}
