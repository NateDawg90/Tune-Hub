import User, { Artist, Follow } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Implement the follow artist logic here
  try {
    await connectToDb();
    const body = await req.json();
    const { artistId, userId } = body;
    const user = await User.findById(userId);
    const artist = await Artist.findById(artistId);
    if (!user || !artist) {
      return NextResponse.json(
        { message: 'User or artist not found' },
        { status: 404 }
      );
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      user: userId,
      artist: artistId,
    });
    if (existingFollow) {
      return NextResponse.json(
        { error: 'Already following artist' },
        { status: 400 }
      );
    }

    // Create the follow relationship
    const follow = new Follow({ user: userId, artist: artistId });
    await follow.save();

    // increment artist's followers count
    await Artist.updateOne(
      {
        _id: artistId,
      },
      {
        $inc: { followers: 1 },
      }
    );
    return NextResponse.json(
      { message: 'followed artist' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error following artist:', err);
    return NextResponse.json(
      { message: 'error following artist', err },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const params = req.nextUrl.searchParams;
    const userId = params.get('userId');
    const artistId = params.get('artistId');
    if (!userId) {
      return NextResponse.json(
        { message: 'userId and artistId are required' },
        { status: 400 }
      );
    }

    if (!artistId) {
      const follows = await Follow.find({ user: userId }).populate(
        'artist'
      );
      return NextResponse.json({ follows }, { status: 200 });
    }

    const follow = await Follow.findOne({
      user: userId,
      artist: artistId,
    });

    if (!follow) {
      return NextResponse.json(
        { message: 'Follow relationship not found' },
        { status: 200 }
      );
    }

    return NextResponse.json(follow, { status: 200 });
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error', err },
      { status: 500 }
    );
  }
}
