import { Album } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDb();
  try {
    const { id } = params;
    const album = await Album.findById(id)
      .populate('artist')
      .populate('songs')
      .exec();

    if (!album) {
      return NextResponse.json(
        { message: 'Album not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(album, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error fetching album', err },
      { status: 500 }
    );
  }
}
