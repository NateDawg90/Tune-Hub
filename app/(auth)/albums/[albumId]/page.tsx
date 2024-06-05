import AlbumComponent from '@/app/(components)/album';
import { Album } from '@/app/(models)';
import { verifyAuth } from '@/lib/lucia';
export default async function Page({
  params,
}: {
  readonly params: { albumId: string };
}) {
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

  return (
    <div className="container mx-auto my-5">
      <AlbumComponent
        userId={userId}
        artwork={artwork}
        name={name}
        songs={songs}
        artist={artist}
      />
    </div>
  );
}
