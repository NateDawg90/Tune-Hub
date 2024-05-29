// /pages/api/artists/[id].ts
import Artist from '@/app/(models)/Artist';
import connectToDb from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDb();
    const users = await Artist.find();

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}
