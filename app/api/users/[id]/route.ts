import { User } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: Request) {
  await connectToDb();
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userData = body.formData;
    await User.findByIdAndUpdate(id, userData);

    return NextResponse.json(
      { message: 'user updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: 'error', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: 'id query parameter is required' },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          'User ' + deletedUser.firstName + ' deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting user', error },
      { status: 500 }
    );
  }
}
