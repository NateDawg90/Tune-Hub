import { useMusicPlayer } from '@/store/music-player-context';
import { Song } from '../(models)/Song';

interface SongViewProps {
  song: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
  onResume: () => void;
}

const SongView = ({
  song,
  isPlaying,
  onPlay,
  onPause,
  onResume,
}: SongViewProps) => {
  const { currentSong } = useMusicPlayer();
  const isCurrentSong = currentSong?._id === song._id;

  const handleClick = () => {
    if (isCurrentSong) {
      if (isPlaying) {
        onPause();
      } else {
        onResume();
      }
    } else {
      onPlay(song);
    }
  };

  const playButton = (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#C0C0C0" />
      <path d="M20 16L32 24L20 32V16Z" fill="black" />
    </svg>
  );

  const pauseButton = (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#C0C0C0" />
      <rect x="18" y="16" width="4" height="16" fill="black" />
      <rect x="26" y="16" width="4" height="16" fill="black" />
    </svg>
  );

  return (
    <div className="flex items-center justify-between p-2 ">
      <span>{song.name}</span>
      <button onClick={handleClick} className="text-blue-500">
        {isPlaying ? pauseButton : playButton}
      </button>
    </div>
  );
};

export default SongView;
