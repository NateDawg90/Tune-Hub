import { verifyAuth } from '@/lib/lucia';
import { NextResponse } from 'next/server';

export async function GET(_: Request) {
  const { user } = await verifyAuth();
  if (!user) {
    return NextResponse.json(
      { message: 'user not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: 'user authenticated' },
    { status: 200 }
  );
}
