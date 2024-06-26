// app/api/albums/route.ts
import { Album } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connectToDb();
  try {
    const albums = await Album.find().populate('artist').exec();

    return NextResponse.json(albums, { status: 200 });
  } catch (err) {
    console.error('Error fetching albums:', err);
    return NextResponse.json(
      { message: 'Error fetching albums', error: err },
      { status: 500 }
    );
  }
}
