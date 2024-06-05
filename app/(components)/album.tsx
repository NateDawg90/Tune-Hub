import Image from 'next/image';
import SongView from './song';
import { Song } from '../(models)/Song';
import FollowArtist from './follow-artist';
import { Artist } from '../(models)/Artist';
interface AlbumProps {
  userId: string;
  artwork: string;
  name: string;
  songs: Song[];
  showTracks?: boolean;
  artist: Artist;
}
const AlbumComponent = ({
  userId,
  artwork,
  name,
  songs,
  artist,
  showTracks = true,
}: AlbumProps) => {
  const { followers, name: artistName, _id: artistId } = artist;

  return (
    <div className="p-4">
      <div className="flex mb-4  justify-between">
        <Image
          width={500}
          height={500}
          src={artwork}
          alt={name}
          className="w-48 h-48 object-cover rounded"
        />
        <div className="flex flex-col justify-between items-end">
          <FollowArtist
            userId={userId}
            artistId={artistId}
            artistName={artistName}
            followers={followers}
          />
          <h1 className="text-3xl font-bold ml-5">{name}</h1>
        </div>
      </div>
      {showTracks && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <ul className="list-disc list-inside">
            {songs.map((song) => (
              <SongView key={song._id} song={song} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlbumComponent;
