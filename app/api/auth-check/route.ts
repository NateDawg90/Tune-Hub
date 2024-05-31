import { verifyAuth } from '@/lib/lucia';
import connectToDb from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
  await connectToDb();
  const { user } = await verifyAuth();
  if (!user) {
    return NextResponse.json(
      { message: 'user not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: 'user authenticated', user },
    { status: 200 }
  );
}
