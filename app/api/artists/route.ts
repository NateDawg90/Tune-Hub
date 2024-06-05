import { Artist } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
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
