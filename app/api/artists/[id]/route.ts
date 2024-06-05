import { Artist } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return NextResponse.json(
        { message: 'Artist not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(artist, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}
