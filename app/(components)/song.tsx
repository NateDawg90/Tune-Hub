'use client';
import { useMusicPlayer } from '@/store/music-player-context';
import { Song } from '../(models)/Song';
import { PauseIcon, PlayIcon } from './icons';

interface SongViewProps {
  song: Song;
}

const SongView = ({ song }: SongViewProps) => {
  const { togglePlayPause, currentSong, isPlaying } =
    useMusicPlayer();
  const thisSongIsPlaying =
    currentSong?._id === song._id && isPlaying;
  return (
    <div className="flex items-center justify-between p-2 ">
      <span>{song.name}</span>
      <button
        onClick={() => togglePlayPause(song)}
        className="text-blue-500"
      >
        {thisSongIsPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default SongView;
