// app/api/albums/artist/[artistId]/route.ts
import { Album } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { artistId: string } }
) {
  await connectToDb();
  const { artistId } = params;
  if (!artistId) {
    return NextResponse.json(
      { message: 'Artist ID is required' },
      { status: 400 }
    );
  }

  try {
    const albums = await Album.find({ artist: artistId }).populate(
      'artist'
    );
    return NextResponse.json(albums, { status: 200 });
  } catch (err) {
    console.error('Error fetching albums:', err);
    return NextResponse.json(
      { message: 'Error fetching albums', error: err },
      { status: 500 }
    );
  }
}
