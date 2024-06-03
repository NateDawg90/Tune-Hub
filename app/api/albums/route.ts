// app/api/albums/route.ts
import Album from '@/app/(models)/Album';
import Artist from '@/app/(models)/Artist';
import connectToDb from '@/db/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDb();
    const albums = await Album.find().populate('artist').exec();
    console.log('Fetched albums:', albums); // Log to verify data
    return NextResponse.json(albums, { status: 200 });
  } catch (err) {
    console.error('Error fetching albums:', err);
    return NextResponse.json(
      { message: 'Error fetching albums', error: err },
      { status: 500 }
    );
  }
}
