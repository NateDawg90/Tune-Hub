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

  function msToTime(duration: number) {
    const minutes = Math.floor(
      (duration % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;

    return minutesStr + ':' + secondsStr;
  }

  const duration = msToTime(parseInt(song.length));
  return (
    <div className="flex items-center justify-between p-2 ">
      <span>{song.name}</span>
      <div className="flex items-center justify-end ">
        <span className="mr-4">{duration}</span>
        <span className="mx-2 hidden md:block">Sample</span>
        <button
          onClick={() => togglePlayPause(song)}
          className="text-blue-500"
        >
          {thisSongIsPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
};

export default SongView;
