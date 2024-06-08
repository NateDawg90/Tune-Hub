import { Follow } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  if (!userId) {
    return NextResponse.json(
      { message: 'userId is required' },
      { status: 400 }
    );
  }

  try {
    await connectToDb();

    const follows = await Follow.find({ user: userId }).populate(
      'artist'
    );
    return NextResponse.json(follows, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}
