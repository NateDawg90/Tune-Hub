import AlbumComponent from '@/app/(components)/album';
import { fetchAlbum } from '@/helpers/network/server/albums';
import { verifyAuth } from '@/lib/lucia';
export default async function Page({
  params,
}: {
  readonly params: { albumId: string };
}) {
  const { albumId } = params;
  const { user } = await verifyAuth();

  const userId = user?.id ?? '';
  const albumData = await fetchAlbum(albumId);

  if (!albumData) return <div>Loading...</div>;

  const album = JSON.parse(JSON.stringify(albumData));
  const { artist, songs, artwork, name } = album;

  return (
    <div className="md:container md:mx-auto my-5">
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
