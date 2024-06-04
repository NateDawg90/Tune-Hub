import { useMusicPlayer } from '@/store/music-player-context';
import { Song } from '../(models)/Song';
import { PauseIcon, PlayIcon } from './icons';

interface SongViewProps {
  song: Song;
  isPlaying: boolean;
}

const SongView = ({ song, isPlaying }: SongViewProps) => {
  const { togglePlayPause } = useMusicPlayer();

  return (
    <div className="flex items-center justify-between p-2 ">
      <span>{song.name}</span>
      <button
        onClick={() => togglePlayPause(song)}
        className="text-blue-500"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default SongView;
