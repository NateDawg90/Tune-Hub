// app/api/albums/route.ts
import { Album } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const params = req.nextUrl.searchParams;
    const artistId = params.get('artistId');
    if (!artistId) {
      const albums = await Album.find().populate('artist').exec();
      return NextResponse.json(albums, { status: 200 });
    }

    const albums = await Album.find({ artist: artistId })
      .populate('artist')
      .exec();
    return NextResponse.json(albums, { status: 200 });
  } catch (err) {
    console.error('Error fetching albums:', err);
    return NextResponse.json(
      { message: 'Error fetching albums', error: err },
      { status: 500 }
    );
  }
}
