import { Artist, Follow } from '@/app/(models)';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    console.log('body:', body);
    const { artistId, userId } = body;

    // Check if the follow relationship exists
    const follow = await Follow.findOneAndDelete({
      user: userId,
      artist: artistId,
    });

    if (!follow) {
      return NextResponse.json(
        { message: 'Follow relationship not found' },
        { status: 404 }
      );
    }

    // remove 1 from artist's followers count
    await Artist.updateOne(
      {
        _id: artistId,
      },
      {
        $inc: { followers: -1 },
      }
    );

    return NextResponse.json(
      { message: 'Unfollowed successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error({ err });
    return NextResponse.json(
      { message: 'Error unfollowing', err },
      { status: 500 }
    );
  }
}
