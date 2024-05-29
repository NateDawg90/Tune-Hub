import Artist from '@/app/(models)/Artist';
import connectToDb from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDb();
    const artists = await Artist.find();

    return NextResponse.json({ artists }, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}
