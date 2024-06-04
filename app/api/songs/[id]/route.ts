import { Album, Song } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const { id } = params;
    const song = await Song.findById(id);

    if (!song) {
      return NextResponse.json(
        { message: 'Song not found' },
        { status: 404 }
      );
    }

    const album = await Album.findById(song.album)
      .populate('artist')
      .exec();

    song.album = album;
    return NextResponse.json(song, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error fetching song', err },
      { status: 500 }
    );
  }
}
