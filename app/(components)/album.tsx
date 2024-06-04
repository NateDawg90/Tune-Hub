import Image from 'next/image';
import SongView from './song';
import { Song } from '../(models)/Song';
interface AlbumProps {
  artwork: string;
  name: string;
  songs: Song[];
}
const AlbumComponent = ({ artwork, name, songs }: AlbumProps) => {
  return (
    <div className="p-4">
      <div className="flex mb-4 items-end">
        <Image
          width={500}
          height={500}
          src={artwork}
          alt={name}
          className="w-48 h-48 object-cover rounded"
        />
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tracks</h2>
        <ul className="list-disc list-inside">
          {songs.map((song) => (
            <SongView key={song._id} song={song} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumComponent;
