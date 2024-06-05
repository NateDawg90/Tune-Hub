import AlbumComponent from '@/app/(components)/album';
import FollowArtist from '@/app/(components)/follow-artist';
import { Album } from '@/app/(models)';
import connectToDb from '@/db/mongoose';
import { verifyAuth } from '@/lib/lucia';
export default async function Page({
  params,
}: {
  readonly params: { albumId: string };
}) {
  await connectToDb();
  const { albumId } = params;
  const { user } = await verifyAuth();
  const userId = user?.id ?? '';
  const albumData = await Album.findById(albumId)
    .populate('artist')
    .populate('songs')
    .exec();

  if (!albumData) return <div>Loading...</div>;

  const album = JSON.parse(JSON.stringify(albumData));

  const { artist, songs, artwork, name } = album;
  const { followers, name: artistName, _id: artistId } = artist;

  return (
    <>
      <FollowArtist
        userId={userId}
        artistId={artistId}
        artistName={artistName}
        followers={followers}
      />
      <AlbumComponent artwork={artwork} name={name} songs={songs} />
    </>
  );
}
